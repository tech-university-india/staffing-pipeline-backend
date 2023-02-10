// require user.service.js
const userServices = require('../../src/services/user.service');
// require users models
const { users } = require('../../src/models');
// require NotFoundError
const { NotFoundError } = require('../../errors/httpError');

describe('User Services', () => {
  describe('function getAllUsers', () => {
    it('Should return an array of users', async () => {
      const resolvedValue = [
        {
          user_id: '1',
          name: 'john doe',
          email: 'johndoe@mckinsey.com',
          fmno: '123456',
          current_engagement_ids: [
            '1', '2'
          ],
          case_study_ids: [
            '1', '2'
          ],
          skills: [
            'node, react'
          ],
          role: 'intern',
          guild: 'swe',
          past_engagement_ids: [
            '1', '2'
          ],
          createdAt: '2022-01-17T04:33:12.000Z',
          updatedAt: '2022-01-17T04:33:12.000Z'
        }
      ];
      jest.spyOn(users, 'findAll').mockResolvedValue(resolvedValue);
      const result = await userServices.getAllUsers();
      expect(result).toEqual(resolvedValue);
    });
  });
  describe('function getOneUser', () => {
    it('Should return a user object with given user_id', async () => {
      const resolvedValue = {
        user_id: '1',
        name: 'john doe',
        email: 'johndoe@mckinsey.com',
        fmno: '123456',
        current_engagement_ids: [
          '1', '2'
        ],
        case_study_ids: [
          '1', '2'
        ],
        skills: [
          'node, react'
        ],
        role: 'intern',
        guild: 'swe',
        past_engagement_ids: [
          '1', '2'
        ],
        createdAt: '2022-01-17T04:33:12.000Z',
        updatedAt: '2022-01-17T04:33:12.000Z'
      };
      jest.spyOn(users, 'findOne').mockResolvedValue(resolvedValue);
      const result = await userServices.getOneUser('1');
      expect(result).toEqual(resolvedValue);
    });
    it('Should throw a NotFoundError if user_id is not found', async () => {
      const mockUserId = 59;
      const error = new NotFoundError('User not found');
      jest.spyOn(users, 'findOne').mockResolvedValue(null);
      await expect(userServices.getOneUser(mockUserId)).rejects.toThrow(error);

    });
  });
});