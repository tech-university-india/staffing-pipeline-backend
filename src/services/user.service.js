
const { users } = require('../models');
const CustomErrors = require('../../errors/httpError');

const userServices = {
  listUsers: async () => {
    const allUsers = await users.findAll();
    return allUsers;
  },
  getUser: async (user_id) => {
    const user = await users.findOne({
      where: {
        user_id
      }
    });
    if (!user) {
      throw new CustomErrors.NotFoundError('User not found');
    }
    return user;
  }
};

module.exports = userServices;