// require user model

const CustomErrors = require('../utils/httpError');
const db = require('../models');

const getUser = async userId => {
  const user = await db.users.findOne({
    where: {
      userId,
    },
  });
  if (!user) {
    throw new CustomErrors.NotFoundError('User not found');
  }
  return user;
};
const listUsers = async () => {
  try {
    const allUsers = await db.users.findAll();
    return allUsers;
  } catch (error) {
    console.log(error);
    throw new CustomErrors.HttpError(error.message, 500);
  }
};

const createUser = async userDetails => {
  try {
    const newUser = await db.users.create(userDetails);
    return newUser;
  } catch (error) {
    throw new CustomErrors.HttpError(error.message, 400);
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

const deleteUser = async userId => {
  const deletedRows = db.users.destroy({
    where: {
      userId,
    },
  });
  return deletedRows;
};

module.exports = {
  listUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
