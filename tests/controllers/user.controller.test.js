
const userController = require('../../src/controllers/user.controller');
const userServices = require('../../src/services/user.service');


describe('User Controller', () => {
  describe('function getUsers', () => {
    it('Should return all users', async () => {
      const mockReq = {};
      const mockRes = {
        status: jest.fn(),
        json: jest.fn()
      };
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
      jest.spyOn(userServices, 'getAllUsers').mockResolvedValue(resolvedValue);
      await userController.getUsers(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(resolvedValue);
    });
  });
});