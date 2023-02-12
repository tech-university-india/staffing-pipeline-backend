const HttpError = require('../utils/httpError');
const bcrypt = require('bcrypt');
const db = require('../models');

const listUsers = async () => {
  try {
    const allUsers = await db.users.findAll();
    return allUsers;
  } catch (error) {
    console.log(error);
    throw new HttpError(error.message, 500);
  }
};

const updateUser = async (userId, userDetails) => {
  const user = await db.users.findOne({ where: { userId } });
  if (!user) {
    return null;
  }
  for (let key in userDetails) {
    user[key] = userDetails[key];
  }
  await user.save();
  return user;
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
  updateUser,
  createUser,
  deleteUser,
};
