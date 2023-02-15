// require user.service.js
const userServices = require('../../src/services/user.service');
// require users models
const { users } = require('../../src/models');
// require NotFoundError
const { NotFoundError } = require('../../src/utils/httpError');
const mockdata = require('../__mocks__/user');
describe('User Services', () => {
  describe('function listUsers', () => {
    it('Should return an array of users', async () => {
      const resolvedValue = [mockdata.getUser.resolvedValue];
      jest.spyOn(users, 'findAll').mockResolvedValue(resolvedValue);
      const result = await userServices.listUsers();
      expect(result).toEqual(resolvedValue);
    });
  });
  describe('function getOneUser', () => {
    it('Should return a user object with given user_id', async () => {
      const resolvedValue = mockdata.getUser.resolvedValue;
      jest.spyOn(users, 'findOne').mockResolvedValue(resolvedValue);
      const result = await userServices.getUser('1');
      expect(result).toEqual(resolvedValue);
    });
    it('Should throw a NotFoundError if user_id is not found', async () => {
      const mockUserId = 59;
      const error = new NotFoundError('User not found');
      jest.spyOn(users, 'findOne').mockResolvedValue(null);
      await expect(userServices.getUser(mockUserId)).rejects.toThrow(error);
    });
  });
  describe('function deleteUser', () => {
    it('should delete an user', async () => {
      jest.spyOn(users, 'destroy').mockResolvedValue(mockdata.deleteUser.deletedUser);
      const response = await userServices.deleteUser(mockdata.deleteUser.deletedUser.id);
      expect(response).toEqual(mockdata.deleteUser.deletedUser);
    });
    it('should delete an user', async () => {
      jest.spyOn(users, 'destroy').mockResolvedValue(mockdata.deleteUser.deletedUser);
      const response = await userServices.deleteUser(mockdata.deleteUser.deletedUser.id);
      expect(response).toEqual(mockdata.deleteUser.deletedUser);
    });
  });
  describe('function createUser', () => {
    it('should create a new user', async () => {
      jest.spyOn(users, 'create').mockResolvedValue(mockdata.createUser.newUser);
      const response = await userServices.createUser(mockdata.createUser.newUser);
      expect(response).toEqual(mockdata.createUser.newUser);
    });
  });
  describe('function updateUser', () => {
    it('Should update user details', async () => {
      const resolvedValue = { ...mockdata.updateUser.resolvedValue, save: jest.fn() };
      jest.spyOn(users, 'findOne').mockResolvedValue(resolvedValue);
      const result = await userServices.updateUser(
        mockdata.updateUser.mockReq.params.id,
        mockdata.updateUser.mockReq.body
      );
      expect(result).toEqual(resolvedValue);
    });
  });
  describe('function deleteFromUser', () => {
    it('should delete engagement of the given id from the database', async () => {
      jest.spyOn(users, 'findOne').mockResolvedValue(mockdata.deleteUser.mockUser);
      jest.spyOn(users, 'update').mockResolvedValue(mockdata.deleteUser.mockUsers);
      const project = await userServices.deleteProjectFromUsers(mockdata.deleteUser.mockUser.userIds, 2);
      expect(project).toEqual(undefined);
    });
  });
});
