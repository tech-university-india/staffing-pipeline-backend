
// require user model
const { Users } = require('../models');

const userServices = {
  'getAllUsers': async () => {
    const allUsers = await Users.findAll();
    return allUsers;
  },
  'createUser': async (userDetails) => {
    const newUser = await Users.create(userDetails);
    return newUser;
  },
  'updateUser': async (id, userDetails) => {
    const user = await Users.findOne({ where: { id } });
    for(let key in userDetails) {
      user[key] = userDetails[key];
    }
    await user.save();
    return user;
  }
};

module.exports = userServices;