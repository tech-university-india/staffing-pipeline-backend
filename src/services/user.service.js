
const { users } = require('../models');

const userServices = {
  getAllUsers: async () => {
    const allUsers = await users.findAll();
    return allUsers;
  }
};

module.exports = userServices;