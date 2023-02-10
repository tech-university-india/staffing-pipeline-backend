
const userServices = require('../services/user.services');
const getUsers = async (req, res) => {
  try {
    const allUsers = await userServices.getAllUsers();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(error.statusCode).json({
      error: error.message,
    });
  }
};
const createUser = async (req, res) => {
  try {
    const newUser = await userServices.createUser(req.body);
    res.status(201).json({ data: newUser, success: true });
  } catch (error) {
    res.status(error.statusCode).json({
      error: error.message,
    });
  }
};
const deleteUser = async (req, res) => {
  await userServices.deleteUser(req.params.id);
  res.status(200).json({ message: 'User deleted' });
};
module.exports = { getUsers, createUser , deleteUser};


