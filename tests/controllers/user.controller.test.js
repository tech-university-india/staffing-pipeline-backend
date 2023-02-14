const { HttpError, NotFoundError } = require('../../src/utils/httpError');
const userController = require('../../src/controllers/user.controller');
const userServices = require('../../src/services/user.service');

describe('User Controller', () => {
  describe('function createUser', () => {
    it('should create the user and status returned is 201', async () => {
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
    it('should throw error with status 400', async () => {
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
    describe('function deleteUser', () => {
      it('should delete a user', async () => {
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
    describe('function updateUser', () => {
      it('should update user details', async () => {
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
      it('should return 404 if user not found', async () => {
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
      it('should return 500 if something went wrong', async () => {
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
});
