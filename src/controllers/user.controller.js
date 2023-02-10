const userServices = require('../services/user.service');

const getUsers = async (_, res) => {
  const allUsers = await userServices.listUsers();
  res.status(200).json(allUsers);
};

const postUser = async (req, res) => {
  const newUser = await userServices.createUser(req.body);
  res.status(201).json(newUser);
};

const deleteUser = async (req, res) => {
  await userServices.deleteUser(req.params.id);
  res.status(200).json({ message: 'User deleted' });
};

module.exports = { getUsers, postUser, deleteUser };
