const authController = require('../../src/controllers/auth.controller');
const authServices = require('../../src/services/auth.service');
const LoginError = require('../../src/utils/loginError');
const HttpError = require('../../src/utils/httpError');
describe('Check Authentication Controller', () => {
  it('check createUserLogin function which should create the user and status returned is 201', async () => {
    jest.spyOn(authServices, 'setUserCredentials').mockResolvedValue({
      id: 1,
      email: 'promit.revar2211@gmail.com',
      password: '$2b$08$ap2OSCeWEBVlDY.xui2bPuoblmWTDQwetDvMHZF1B7k.NI3Ae5Tyq',
      createdAt: '2023-02-09T14:45:57.071Z',
      updatedAt: '2023-02-09T14:45:57.071Z',
    });

    const mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await authController.createUserLogin(
      {
        body: {
          email: 'promit.revar2211@gmail.com',
          password: 'test',
        },
      },
      mockRes
    );
    expect(mockRes.status).toBeCalledWith(201);
    expect(mockRes.json).toBeCalledWith({
      success: true,
    });
  });
  it('check createUserLogin function which should throw error with message user already exists and status 400', async () => {
    jest.spyOn(authServices, 'setUserCredentials').mockImplementation(() => {
      throw new HttpError('User already exists', 400);
    });

    const mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await authController.createUserLogin(
      {
        body: {
          email: 'promit.revar2211@gmail.com',
          password: 'test',
        },
      },
      mockRes
    );
    expect(mockRes.status).toBeCalledWith(400);
    expect(mockRes.json).toBeCalledWith({
      error: 'User already exists',
      success: false,
    });
  });
  it('check createUserLogin function which should throw http error with message cannot create the user and status 500 if there is error in database insert', async () => {
    const err = new HttpError('cannot create the user', 500);
    jest.spyOn(authServices, 'setUserCredentials').mockRejectedValue(err);

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await authController.createUserLogin(
      {
        body: {
          email: 'promit.revar2211@gmail.com',
          password: 'test',
        },
      },
      mockRes
    );
    expect(mockRes.status).toBeCalledWith(500);
    expect(mockRes.json).toBeCalledWith({
      error: 'cannot create the user',
      success: false,
    });
  });
  it('should verify the email and password and return token', async () => {
    jest.spyOn(authServices, 'validateUserAndReturnToken').mockResolvedValue({
      data: {
        id: 1,
        email: 'promit.revar2211@gmail.com',
        password: '$2b$08$ap2OSCeWEBVlDY.xui2bPuoblmWTDQwetDvMHZF1B7k.NI3Ae5Tyq',
        createdAt: '2023-02-09T14:45:57.071Z',
        updatedAt: '2023-02-09T14:45:57.071Z',
      },
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByb21pdC5yZXZhcjIyMTFAZ21haWwuY29tIiwiaWF0IjoxNjc1OTYyOTI3LCJleHAiOjE2NzU5NjY1Mjd9.Ve6AIDZWdbq4ptj-fceQHXns4g_PLeD2KYwtgSpfhu4',
      success: true,
      message: 'Login successful',
    });

    const mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await authController.loginController(
      {
        body: {
          email: 'promit.revar2211@gmail.com',
          password: 'test',
        },
      },
      mockRes
    );
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.json).toBeCalledWith({
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByb21pdC5yZXZhcjIyMTFAZ21haWwuY29tIiwiaWF0IjoxNjc1OTYyOTI3LCJleHAiOjE2NzU5NjY1Mjd9.Ve6AIDZWdbq4ptj-fceQHXns4g_PLeD2KYwtgSpfhu4',
      success: true,
    });
  });
  it('should spot invalid password and throw the error with Invalid Credentials message', async () => {
    jest.spyOn(authServices, 'validateUserAndReturnToken').mockImplementation(() => {
      throw new LoginError('Invalid credentials', 401);
    });

    const mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await authController.loginController(
      {
        body: {
          email: 'promit.revar2211@gmail.com',
          password: 't',
        },
      },
      mockRes
    );
    expect(mockRes.status).toBeCalledWith(401);
    expect(mockRes.json).toBeCalledWith({
      message: 'Invalid credentials',
      success: false,
    });
  });
  it('email id is not found then should return error with message no such user found with status 404', async () => {
    jest.spyOn(authServices, 'validateUserAndReturnToken').mockImplementation(() => {
      throw new LoginError('No such user found', 404);
    });

    const mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await authController.loginController(
      {
        body: {
          email: 'promit.revar2211@gmail.com',
          password: 't',
        },
      },
      mockRes
    );
    expect(mockRes.status).toBeCalledWith(404);
    expect(mockRes.json).toBeCalledWith({
      message: 'No such user found',
      success: false,
    });
  });
});
