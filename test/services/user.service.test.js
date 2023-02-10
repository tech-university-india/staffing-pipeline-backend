const userServices = require('../../src/services/user.services');
const { users } = require('../../src/models');

describe('User Services', () => {
  describe('getUsers test', () => {
    it('should return a list of users', async () => {
      const allUsers = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@gmail.com',
          password: '12345',
        },
      ];
      jest.spyOn(users, 'findAll').mockResolvedValue(allUsers);
      const reponse = await userServices.getAllUsers();
      expect(reponse).toEqual(allUsers);
    });
  });

  describe('createUser test', () => {
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
  describe('deleteUser test', () => {
    it('should delete a user', async () => {
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
  });
});