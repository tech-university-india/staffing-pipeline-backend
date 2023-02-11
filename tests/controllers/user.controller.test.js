const userController = require('../../src/controllers/user.controller');
const userServices = require('../../src/services/user.service');
const HttpError = require('../../src/utils/httpError');
describe('Check User Controller', () => {
  it('check createUser function which should create the user and status returned is 201', async () => {
    jest.spyOn(userServices, 'createUser').mockResolvedValue({
      user_id: '9a492c13-85e8-4b26-9339-a5d037664d1a',
      email: 'promit.revar2211@gmail.com',
      name: 'Promit Revar',
      updatedAt: '2023-02-09T15:02:53.658Z',
      createdAt: '2023-02-09T15:02:53.658Z',
      fmno: null,
      current_engagement_ids: null,
      case_study_ids: null,
      skills: null,
      role: null,
      guild: null,
      past_engagement_ids: null,
      image: null,
    });

    const mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await userController.createUser(
      {
        body: {
          email: 'promit.revar2211@gmail.com',
          name: 'Promit Revar',
        },
      },
      mockRes
    );
    expect(mockRes.status).toBeCalledWith(201);
    expect(mockRes.json).toBeCalledWith({
      data: {
        user_id: '9a492c13-85e8-4b26-9339-a5d037664d1a',
        email: 'promit.revar2211@gmail.com',
        name: 'Promit Revar',
        updatedAt: '2023-02-09T15:02:53.658Z',
        createdAt: '2023-02-09T15:02:53.658Z',
        fmno: null,
        current_engagement_ids: null,
        case_study_ids: null,
        skills: null,
        role: null,
        guild: null,
        past_engagement_ids: null,
        image: null,
      },
      success: true,
    });
  });
  it('check createUser function which should throw error with status 400', async () => {
    jest.spyOn(userServices, 'createUser').mockImplementation(() => {
      throw new HttpError('notNull Violation: users.email cannot be null', 400);
    });

    const mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await userController.createUser(
      {
        body: {
          name: 'Promit Revar',
        },
      },
      mockRes
    );
    expect(mockRes.status).toBeCalledWith(400);
    expect(mockRes.json).toBeCalledWith({
      error: 'notNull Violation: users.email cannot be null',
    });
  });
});
describe('User Controller', () => {
  describe('function listUsers', () => {
    it('Should return all users', async () => {
      const mockReq = {};
      const mockRes = {
        status: jest.fn(),
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
});

describe('User Controller', () => {
  describe('listUsers test', () => {
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
      await userController.listUsers(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(users);
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
