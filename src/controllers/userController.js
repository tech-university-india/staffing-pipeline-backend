

const userServices = require('../services/userServices');

const getUsers = async (req, res) => {
  const allUsers = await userServices.getAllUsers();
  res.status(200).json(allUsers);
};

const postUser = async (req, res) => {
  const newUser = await userServices.createUser(req.body);
  res.status(201).json(newUser);
};
const updateUser = async (req, res) => {
  const { id } = req.params;
  const updatedUser = await userServices.updateUser(id,req.body);
  res.status(200).json(updatedUser);
};
module.exports = { getUsers, postUser , updateUser };