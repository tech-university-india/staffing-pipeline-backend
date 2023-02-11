const userServices = require('../services/user.service');
const listUsers = async (req, res) => {
  try {
    console.log('listUsers called');
    const allUsers = await userServices.listUsers();
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
module.exports = { listUsers, createUser, deleteUser };
