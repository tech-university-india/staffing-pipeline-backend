const userServices = require('../services/user.service');
const { NotFoundError } = require('../../src/utils/httpError');
const logger = require('../logger');
const listUsers = async (_, res) => {
  logger.info("call the listUsers service");
  const allUsers = await userServices.listUsers();
  res.status(200);
  res.json(allUsers);
};
const getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    logger.info("call the getUser service")
    const user = await userServices.getUser(userId);
    res.status(200);
    res.json(user);
  } catch (error) {
    logger.info("error occured while calling getUser service");
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
    logger.info("call the createUser service");
    const newUser = await userServices.createUser(req.body);
    res.status(201).json({ data: newUser, success: true });
  } catch (error) {
    logger.info("error while calling createUser service");
    res.status(error.statusCode).json({
      error: error.message,
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    logger.info("call the deleteUser service called");
    await userServices.deleteUser(req.params.id);
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    logger.info("error while calling deleteUser service");
    res.status(500).json({ message: 'Something went wrong.' });
  }
};
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    logger.info('call the updateUser service');
    const updatedUser = await userServices.updateUser(id, body);
    if (!updatedUser) res.status(404).json({ message: 'User not found' });
    res.status(200).json(updatedUser);
  } catch (error) {
    logger.info("error while calling updateUser service");
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { listUsers, createUser, deleteUser, updateUser, getUser };
