// require user model

const CustomErrors = require('../utils/httpError');
const db = require('../models');
const logger = require('../logger');
const getUser = async userId => {
  logger.info(`get user from database with user_id: ${userId}`);
  const user = await db.users.findOne({
    where: {
      userId,
    },
  });
  if (!user) {
    logger.info(`No user with user_id: ${userId}`);
    throw new CustomErrors.NotFoundError('User not found');
  }
  return user;
};
const listUsers = async () => {
  try {
    logger.info('Get all users from the Database');
    const allUsers = await db.users.findAll();
    return allUsers;
  } catch (error) {
    logger.info('error in getting all the users from the database');
    console.log(error);
    throw new CustomErrors.HttpError(error.message, 500);
  }
};

const createUser = async userDetails => {
  try {
    logger.info('create user in the database');
    const newUser = await db.users.create(userDetails);
    return newUser;
  } catch (error) {
    logger.info('Error in creating user');
    throw new CustomErrors.HttpError(error.message, 400);
  }
};

const updateUser = async (userId, userDetails) => {
  logger.info('update user in database with user_id: ' + userId);
  const user = await db.users.findOne({ where: { userId } });
  if (!user) {
    logger.info('No user in database exists with user_id: ' + userId);
    return null;
  }
  for (let key in userDetails) {
    user[key] = userDetails[key];
  }
  await user.save();
  return user;
};

const deleteUser = async userId => {
  logger.info('Delete user from database with user_id: ' + userId);
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
