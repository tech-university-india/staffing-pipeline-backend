
const { users } = require('../models');

const userServices = {
  getAllUsers: async () => {
    const allUsers = await users.findAll();
    return allUsers;
  },
  updateUser: async (id, userDetails) => {
    const user = await users.findOne({ where: { user_id : id } });
    for(let key in userDetails) {
      user[key] = userDetails[key];
    }
    await user.save();
    return user;
  }
};

module.exports = userServices;


