
// require user model
const { users } = require('../models');

const userServices = {
  'getAllUsers': async () => {
    const allUsers = await users.findAll();
    return allUsers;
  },
  'createUser': async (userDetails) => {
    const newUser = await users.create(userDetails);
    return newUser;
  },
  'deleteUser': async (userId) => {
    const deletedUser = await users.destroy({
      where: {
        user_id: userId,
      },
    });
    return deletedUser;
  },
};

module.exports = userServices;