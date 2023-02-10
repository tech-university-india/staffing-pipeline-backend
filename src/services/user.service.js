// require user model
const { users } = require('../models');
const CustomErrors = require('../utils/HttpError');

const getUser = async user_id => {
  const user = await users.findOne({
    where: {
      user_id,
    },
  });
  if (!user) {
    throw new CustomErrors.NotFoundError('User not found');
  }
  return user;
};
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
  getUser,
};
