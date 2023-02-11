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
module.exports = {
  listUsers,
  createUser,
  deleteUser,
  updateUser,
};
