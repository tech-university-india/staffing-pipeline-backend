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

const createUser = async userDetails => {
  try {
    const newUser = await db.users.create(userDetails);
    return newUser;
  } catch (error) {
    throw new HttpError(error.message, 400);
  }
};

const updateUser = async (userId, userDetails) => {
  const user = await users.findOne({ where: { user_id: id } });
  if (!user) {
    return null;
  }
  for (let key in userDetails) {
    user[key] = userDetails[key];
  }
  await user.save();
  return user;
};

const deleteProjectFromUser = async (userIds, id) => {
  const user = await userIds.map(async uid => {
    const userData = await db.users.findOne({
      where: {
        userId: uid,
      },
    });
    userData.dataValues.currentEngagementIds = userData.dataValues.currentEngagementIds.filter(
      element => element !== id
    );
    return userData.dataValues;
  });
  const getUserData = await Promise.all(user);
  getUserData.map(async userElement => {
    const userData = await db.users.update(
      {
        currentEngagementIds: userElement.currentEngagementIds,
      },
      {
        where: {
          userId: userElement.userId,
        },
      }
    );
    return userData;
  });
  await Promise.all(getUserData);
};

module.exports = {
  listUsers,
  createUser,
  updateUser,
  deleteProjectFromUser,
};
