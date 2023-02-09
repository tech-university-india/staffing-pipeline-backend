

const userServices = require('../services/user.service');

const getUsers = async (_, res) => {
  const allUsers = await userServices.getAllUsers();
  res.status(200);
  res.json(allUsers);
};

module.exports = { getUsers };