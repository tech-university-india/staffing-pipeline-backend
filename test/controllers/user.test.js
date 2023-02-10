const userController = require('../../src/controllers/user.controller');
const userServices = require('../../src/services/user.services');

describe('User Controller', () => {
  describe('getUsers test', () => {
    it('should return a list of users', async () => {
      const users = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@gmail.com',
          password: '12345',
        },
      ];
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.spyOn(userServices, 'getAllUsers').mockResolvedValue(users);
      await userController.getUsers(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(users);
    });
  });
  describe('postUser test', () => {
    it('should create a new user', async () => {
      const reqBody = {
        name: 'John Doe',
        email: 'john@gmail.com',
        password: '12345',
      };
      const newUser = {
        id: 1,
        ...reqBody,
      };
      const req = {
        body: {
          ...reqBody,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.spyOn(userServices, 'createUser').mockResolvedValue(newUser);
      await userController.postUser(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newUser);
    });
  });
  describe('deleteUser test', () => {
    it('should delete a user', async () => {
      const deletedUser = {
        id: 1,
        name: 'John Doe',
        email: 'john@gmail.com',
        password: '12345',
      };
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.spyOn(userServices, 'deleteUser').mockResolvedValue(deletedUser);
      await userController.deleteUser(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User deleted',
      });
    });
  });
});