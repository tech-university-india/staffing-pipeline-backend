const userController = require('../../src/controllers/user.controller');
const userServices = require('../../src/services/user.service');

describe('User Controller', () => {
  describe('function getUsers', () => {
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
      await userController.getUsers(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(resolvedValue);
    });
  });
});

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
  describe('function updateUser', () => {
    it('Should update user details', async () => {
      const mockReq = {
        params: {
          id: '1',
        },
        body: {
          name: 'John Doe',
          email: 'JohnDoe@mckinsey.com',
          current_engagement_ids: ['1', '2', '3', '4'],
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const resolvedValue = {
        user_id: '1',
        name: 'John Doe',
        email: 'JohnDoe@mckinsey.com',
        fmno: '123456',
        current_engagement_ids: ['1', '2', '3', '4'],
        case_study_ids: ['1', '2'],
        skills: ['node, react'],
        role: 'intern',
        guild: 'swe',
        past_engagement_ids: ['1', '2'],
        createdAt: '2022-01-17T04:33:12.000Z',
        updatedAt: '2022-01-17T04:33:12.000Z',
      };
      jest.spyOn(userServices, 'updateUser').mockResolvedValue(resolvedValue);
      await userController.updateUser(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(resolvedValue);
    });
    it('Should return 404 if user not found', async () => {
      const mockReq = {
        params: {
          id: '1',
        },
        body: {
          name: 'John Doe',
          email: 'JohnDoe@mckinsey.com',
          current_engagement_ids: ['1', '2', '3', '4'],
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const resolvedValue = null;
      jest.spyOn(userServices, 'updateUser').mockResolvedValue(resolvedValue);
      await userController.updateUser(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'User not found' });
    });
    it('Should return 500 if something went wrong', async () => {
      const mockReq = {
        params: {
          id: '1',
        },
        body: {
          name: 'John Doe',
          email: 'JohnDoe@mckinsey.com',
          current_engagement_ids: ['1', '2', '3', '4'],
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.spyOn(userServices, 'updateUser').mockRejectedValue(new Error('Something went wrong'));
      await userController.updateUser(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Something went wrong' });
    });
  });
});
