const authController = require('../../src/controllers/auth.controller');
const authServices = require('../../src/services/auth.service');
const LoginError = require('../../src/utils/loginError');
const { HttpError } = require('../../src/utils/httpError');
const mockData = require('../__mocks__/auth');
describe('Check Authentication Controller', () => {
  it('check createUserLogin function which should create the user and status returned is 201', async () => {
    jest.spyOn(authServices, 'setUserCredentials').mockResolvedValue(mockData.login.resolvedValue);
    await authController.createUserLogin(mockData.login.mockReq.body, mockData.login.mockRes);
    expect(mockData.login.mockRes.status).toBeCalledWith(201);
    expect(mockData.login.mockRes.json).toBeCalledWith({ success: true });
  });
  it('check createUserLogin function which should throw error with message user already exists and status 400', async () => {
    jest.spyOn(authServices, 'setUserCredentials').mockImplementation(() => {
      throw new HttpError('User already exists', 400);
    });
    await authController.createUserLogin(mockData.login.mockReq.body, mockData.login.mockRes);
    expect(mockData.login.mockRes.status).toBeCalledWith(400);
    expect(mockData.login.mockRes.json).toBeCalledWith({
      error: 'User already exists',
      success: false,
    });
  });
  it('check createUserLogin function which should throw http error with message cannot create the user and status 500 if there is error in database insert', async () => {
    const err = new HttpError('cannot create the user', 500);
    jest.spyOn(authServices, 'setUserCredentials').mockRejectedValue(err);
    await authController.createUserLogin(mockData.login.mockReq.body, mockData.login.mockRes);
    expect(mockData.login.mockRes.status).toBeCalledWith(500);
    expect(mockData.login.mockRes.json).toBeCalledWith({
      error: 'cannot create the user',
      success: false,
    });
  });
  it('should verify the email and password and return token', async () => {
    jest.spyOn(authServices, 'validateUserAndReturnToken').mockResolvedValue(mockData.accessToken.resolvedValue);
    await authController.loginController(mockData.accessToken.mockReq.body, mockData.accessToken.mockRes);
    expect(mockData.accessToken.mockRes.status).toBeCalledWith(200);
    expect(mockData.accessToken.mockRes.json).toBeCalledWith({
      token: mockData.accessToken.resolvedValue.token,
      success: mockData.accessToken.resolvedValue.success,
    });
  });
  it('should spot invalid password and throw the error with Invalid Credentials message', async () => {
    jest.spyOn(authServices, 'validateUserAndReturnToken').mockImplementation(() => {
      throw new LoginError('Invalid credentials', 401);
    });
    await authController.loginController(mockData.wrongPassword.mockReq.body, mockData.wrongPassword.mockRes);
    expect(mockData.wrongPassword.mockRes.status).toBeCalledWith(401);
    expect(mockData.wrongPassword.mockRes.json).toBeCalledWith({
      message: 'Invalid credentials',
      success: false,
    });
  });
  it('email id is not found then should return error with message no such user found with status 404', async () => {
    jest.spyOn(authServices, 'validateUserAndReturnToken').mockImplementation(() => {
      throw new LoginError('No such user found', 404);
    });
    await authController.loginController(mockData.wrongEmail.mockReq.body, mockData.wrongEmail.mockRes);
    expect(mockData.wrongEmail.mockRes.status).toBeCalledWith(404);
    expect(mockData.wrongEmail.mockRes.json).toBeCalledWith({
      message: 'No such user found',
      success: false,
    });
  });
});
