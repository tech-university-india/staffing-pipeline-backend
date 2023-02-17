// require user model

const CustomErrors = require('../utils/httpError');
const db = require('../models');
const logger = require('../logger');
const getUser = async userId => {
  logger.info(`get user from database with id: ${userId}`);
  const user = await db.users.findOne({
    where: {
      userId,
    },
  });
  if (!user) {
    logger.error(`no user with id: ${userId}`);
    throw new CustomErrors.NotFoundError('User not found');
  }
  return user;
};
const listUsers = async () => {
  try {
    logger.info('get all users from the database');
    const allUsers = await db.users.findAll();
    return allUsers;
  } catch (error) {
    logger.error(error);
    throw new CustomErrors.HttpError(error.message, 500);
  }
};

const createUser = async userDetails => {
  try {
    logger.info('create user in the database');
    const newUser = await db.users.create(userDetails);
    return newUser;
  } catch (error) {
    logger.error(error);
    throw new CustomErrors.HttpError(error.message, 400);
  }
};

const updateUser = async (userId, userDetails) => {
  logger.info('update user in database with id: ' + userId);
  const user = await db.users.findOne({ where: { userId } });
  if (!user) {
    logger.info('no user in database exists with id: ' + userId);
    return null;
  }
  for (let key in userDetails) {
    user[key] = userDetails[key];
  }
  await user.save();
  return user;
};

const deleteUser = async userId => {
  logger.info('delete user from database with id: ' + userId);
  const deletedRows = db.users.destroy({
    where: {
      userId,
    },
  });
  return deletedRows;
};

const deleteProjectFromUsers = async (userIds, id) => {
  const users = await userIds.map(async uid => {
    const userData = await db.users.findOne({
      where: {
        userId: uid,
      },
    });
    userData.dataValues.currentEngagementIds = userData.dataValues.currentEngagementIds.filter(
      element => element !== id
    );
    userData.dataValues.pastEngagementIds = userData.dataValues.pastEngagementIds
      ? userData.dataValues.pastEngagementIds.filter(element => element !== id)
      : undefined;
    return userData.dataValues;
  });
  const updatedUsers = await Promise.all(users);
  updatedUsers.map(async user => {
    const userData = await db.users.update(
      {
        currentEngagementIds: user.currentEngagementIds,
        pastEngagementIds: user.pastEngagementIds,
      },
      {
        where: {
          userId: user.userId,
        },
      }
    );
    return userData;
  });
  await Promise.all(updatedUsers);
};

module.exports = {
  listUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  deleteProjectFromUsers,
};
