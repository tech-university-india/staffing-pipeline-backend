// require user model
const { users } = require('../models');

const listUsers = async () => {
  const allUsers = await users.findAll();
  return allUsers;
};
const createUser = async userDetails => {
  const newUser = await users.create(userDetails);
  return newUser;
};

const deleteUser = async userId => {
  const deletedUser = await users.destroy({
    where: {
      user_id: userId,
    },
  });
  return deletedUser;
};

module.exports = {
  listUsers,
  createUser,
  deleteUser,
};
