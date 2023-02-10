// require user.service.js
const userServices = require('../../src/services/user.service');
// require users models
const { users } = require('../../src/models');

describe('User Services', () => {
  describe('function getAllUsers', () => {
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
      const result = await userServices.getAllUsers();
      expect(result).toEqual(resolvedValue);
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
      const result = await userServices.updateUser(
        mockReq.params.id,
        mockReq.body
      );
      expect(result).toEqual(resolvedValue);
    });
  });
});
