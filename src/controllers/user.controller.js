const userServices = require('../services/user.service');
const { NotFoundError } = require('../../src/utils/httpError');

const listUsers = async (_, res) => {
  const allUsers = await userServices.listUsers();
  res.status(200);
  res.json(allUsers);
};
const getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await userServices.getUser(userId);
    res.status(200);
    res.json(user);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(error.code);
      res.json({ message: error.message });
    } else {
      res.status(500);
      res.json({ message: 'Internal Server Error' });
    }
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
  try {
    await userServices.deleteUser(req.params.id);
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updatedUser = await userServices.updateUser(id, body);
    if (!updatedUser) res.status(404).json({ message: 'User not found' });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { listUsers, createUser, deleteUser, updateUser, getUser };
