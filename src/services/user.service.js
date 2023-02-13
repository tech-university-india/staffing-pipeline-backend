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

const getUserByPk = async userId => {
  const user = await db.users.findByPk(userId);
  if (!user) {
    throw new HttpError('User not found', 404);
  }
  return user;
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

const addCurrentEngagement = async (userId, engagementId) => {
  const user = await getUserByPk(userId);
  if (!user.currentEngagementIds.includes(engagementId)) {
    user.currentEngagementIds.push(engagementId);
    await user.save();
  }
  return user;
};

const removeCurrentEngagement = async (userId, engagementId) => {
  const user = await getUserByPk(userId);
  if (user.currentEngagementIds.includes(engagementId)) {
    user.currentEngagementIds = user.currentEngagementIds.filter(id => id !== engagementId);
    await user.save();
  }
  return user;
};

const createUser = async userDetails => {
  const newUser = await db.users.create(userDetails);
  return newUser;
};

const deleteUser = async userId => {
  const deletedUser = await db.users.destroy({
    where: {
      user_id: userId,
    },
  });
  return deletedUser;
};

module.exports = {
  listUsers,
  getUserByPk,
  updateUser,
  createUser,
  deleteUser,
  addCurrentEngagement,
  removeCurrentEngagement,
};
