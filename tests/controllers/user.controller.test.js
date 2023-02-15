const { HttpError, NotFoundError } = require('../../src/utils/httpError');
const userController = require('../../src/controllers/user.controller');
const userServices = require('../../src/services/user.service');
const mockdata = require('../__mocks__/user');
describe('User Controller', () => {
  describe('function createUser', () => {
    it('should create the user and status returned is 201', async () => {
      jest.spyOn(userServices, 'createUser').mockResolvedValue(mockdata.createUser.resolvedValue.data);
      await userController.createUser(mockdata.createUser.mockReq, mockdata.createUser.mockRes);
      expect(mockdata.createUser.mockRes.status).toBeCalledWith(201);
      expect(mockdata.createUser.mockRes.json).toBeCalledWith(mockdata.createUser.resolvedValue);
    });
    it('should throw error with status 400', async () => {
      jest.spyOn(userServices, 'createUser').mockImplementation(() => {
        throw new HttpError(mockdata.createUser.errorMessage, mockdata.createUser.errorCode);
      });
      await userController.createUser(mockdata.createUser.mockReqName, mockdata.createUser.mockRes);
      expect(mockdata.createUser.mockRes.status).toBeCalledWith(400);
      expect(mockdata.createUser.mockRes.json).toBeCalledWith({
        error: mockdata.createUser.errorMessage,
      });
    });
  });
  describe('function getUser', () => {
    it('Should return a user with the given id', async () => {
      jest.spyOn(userServices, 'getUser').mockResolvedValue(mockdata.getUser.resolvedValue);
      await userController.getUser(mockdata.getUser.mockReq, mockdata.getUser.mockRes);
      expect(mockdata.getUser.mockRes.status).toHaveBeenCalledWith(200);
      expect(mockdata.getUser.mockRes.json).toHaveBeenCalledWith(mockdata.getUser.resolvedValue);
    });
    it('Should throw an NotFoundError if user is not found', async () => {
      const err = new NotFoundError('User not found');
      jest.spyOn(userServices, 'getUser').mockRejectedValue(err);
      await userController.getUser(mockdata.getUser.mockReq, mockdata.getUser.mockRes);
      expect(mockdata.getUser.mockRes.status).toHaveBeenCalledWith(err.code);
      expect(mockdata.getUser.mockRes.json).toHaveBeenCalledWith({ message: err.message });
    });
    describe('function listUsers', () => {
      it('Should return all users', async () => {
        const resolvedValue = [mockdata.getUser.resolvedValue];
        jest.spyOn(userServices, 'listUsers').mockResolvedValue(resolvedValue);
        await userController.listUsers(mockdata.getUser.mockReq, mockdata.getUser.mockRes);
        expect(mockdata.getUser.mockRes.status).toHaveBeenCalledWith(200);
        expect(mockdata.getUser.mockRes.json).toHaveBeenCalledWith(resolvedValue);
      });
    });
    describe('function deleteUser', () => {
      it('should delete a user', async () => {
        jest.spyOn(userServices, 'getUser').mockResolvedValue(mockdata.deleteUser.resolvedValue);
        await userController.getUser(mockdata.deleteUser.mockReq, mockdata.deleteUser.mockRes);
        expect(mockdata.deleteUser.mockRes.status).toHaveBeenCalledWith(200);
        expect(mockdata.deleteUser.mockRes.json).toHaveBeenCalledWith(mockdata.deleteUser.resolvedValue);
      });
      it('Should throw an NotFoundError if user is not found', async () => {
        const err = new NotFoundError('User not found');
        jest.spyOn(userServices, 'getUser').mockRejectedValue(err);
        await userController.getUser(mockdata.deleteUser.mockReq, mockdata.deleteUser.mockRes);
        expect(mockdata.deleteUser.mockRes.status).toHaveBeenCalledWith(err.code);
        expect(mockdata.deleteUser.mockRes.json).toHaveBeenCalledWith({ message: err.message });
      });
    });
    describe('function updateUser', () => {
      it('should update user details', async () => {
        jest.spyOn(userServices, 'updateUser').mockResolvedValue(mockdata.updateUser.resolvedValue);
        await userController.updateUser(mockdata.updateUser.mockReq, mockdata.updateUser.mockRes);
        expect(mockdata.updateUser.mockRes.status).toHaveBeenCalledWith(200);
        expect(mockdata.updateUser.mockRes.json).toHaveBeenCalledWith(mockdata.updateUser.resolvedValue);
      });
      it('should return 404 if user not found', async () => {
        const resolvedValue = null;
        jest.spyOn(userServices, 'updateUser').mockResolvedValue(resolvedValue);
        await userController.updateUser(mockdata.updateUser.mockReq, mockdata.updateUser.mockRes);
        expect(mockdata.updateUser.mockRes.status).toHaveBeenCalledWith(404);
        expect(mockdata.updateUser.mockRes.json).toHaveBeenCalledWith({ message: 'User not found' });
      });
      it('should return 500 if something went wrong', async () => {
        jest.spyOn(userServices, 'updateUser').mockRejectedValue(new Error('Something went wrong'));
        await userController.updateUser(mockdata.updateUser.mockReq, mockdata.updateUser.mockRes);
        expect(mockdata.updateUser.mockRes.status).toHaveBeenCalledWith(500);
        expect(mockdata.updateUser.mockRes.json).toHaveBeenCalledWith({ message: 'Something went wrong' });
      });
    });
  });
});
