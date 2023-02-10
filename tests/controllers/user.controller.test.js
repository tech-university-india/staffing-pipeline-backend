const { NotFoundError } = require('../../src/utils/httpError');
const userController = require('../../src/controllers/user.controller');
const userServices = require('../../src/services/user.service');

describe('User Controller', () => {
  describe('function listUsers', () => {
    it('Should return all users', async () => {
      const mockReq = {};
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const resolvedValue = [
        {
          user_id: '1',
          name: 'john doe',
          email: 'johndoe@mckinsey.com',
          fmno: '123456',
          current_engagement_ids: ['1', '2'],
          case_study_ids: ['1', '2'],
          skills: ['node, react'],
          role: 'intern',
          guild: 'swe',
          past_engagement_ids: ['1', '2'],
          createdAt: '2022-01-17T04:33:12.000Z',
          updatedAt: '2022-01-17T04:33:12.000Z',
        },
      ];
      jest.spyOn(userServices, 'listUsers').mockResolvedValue(resolvedValue);
      await userController.listUsers(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(resolvedValue);
    });
  });
  describe('function getUser', () => {
    it('Should return a user with the given id', async () => {
      const mockReq = {
        params: {
          user_id: '1',
        },
      };
      const mockRes = {
        status: jest.fn(),
        json: jest.fn(),
      };
      const resolvedValue = {
        user_id: '1',
        name: 'john doe',
        email: 'johndoe@mckinsey.com',
        fmno: '123456',
        current_engagement_ids: ['1', '2'],
        case_study_ids: ['1', '2'],
        skills: ['node, react'],
        role: 'intern',
        guild: 'swe',
        past_engagement_ids: ['1', '2'],
        createdAt: '2022-01-17T04:33:12.000Z',
        updatedAt: '2022-01-17T04:33:12.000Z',
      };
      jest.spyOn(userServices, 'getUser').mockResolvedValue(resolvedValue);
      await userController.getUser(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(resolvedValue);
    });
    it('Should throw an NotFoundError if user is not found', async () => {
      const mockReq = {
        params: {
          user_id: '555',
        },
      };
      const mockRes = {
        status: jest.fn(),
        json: jest.fn(),
      };
      const err = new NotFoundError('User not found');
      jest.spyOn(userServices, 'getUser').mockRejectedValue(err);
      await userController.getUser(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(err.code);
      expect(mockRes.json).toHaveBeenCalledWith({ message: err.message });
    });
  });
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
      jest.spyOn(userServices, 'listUsers').mockResolvedValue(users);
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
