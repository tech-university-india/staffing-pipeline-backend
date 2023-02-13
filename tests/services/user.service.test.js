// require user.service.js
const userServices = require('../../src/services/user.service');
// require users models
const { users } = require('../../src/models');

describe('User Services', () => {
  describe('function listUsers', () => {
    it('Should return an array of users', async () => {
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
      jest.spyOn(users, 'findAll').mockResolvedValue(resolvedValue);
      const result = await userServices.listUsers();
      expect(result).toEqual(resolvedValue);
    });
  });
  describe('function deleteUser', () => {
    it('should delete an user', async () => {
      const deletedUser = {
        id: 1,
        name: 'John Doe',
        email: 'john@gmail.com',
        password: '12345',
      };
      jest.spyOn(users, 'destroy').mockResolvedValue(deletedUser);
      const response = await userServices.deleteUser(deletedUser.id);
      expect(response).toEqual(deletedUser);
    });
    it('should delete an user', async () => {
      const deletedUser = {
        id: 1,
        name: 'John Doe',
        email: 'john@gmail.com',
        password: '12345',
      };
      jest.spyOn(users, 'destroy').mockResolvedValue(deletedUser);
      await userServices.deleteUser(deletedUser.id);
      expect(users.destroy).toHaveBeenCalledWith({
        where: {
          userId: deletedUser.id,
        },
      });
    });
  });
  describe('function createUser', () => {
    it('should create a new user', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@gmail.com',
        password: '12345',
      };
      const newUser = {
        id: 1,
        ...userData,
      };
      jest.spyOn(users, 'create').mockResolvedValue(newUser);
      const response = await userServices.createUser(userData);
      expect(response).toEqual(newUser);
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
        save: jest.fn(),
      };
      jest.spyOn(users, 'findOne').mockResolvedValue(resolvedValue);
      const result = await userServices.updateUser(mockReq.params.id, mockReq.body);
      expect(result).toEqual(resolvedValue);
    });
  });
});
