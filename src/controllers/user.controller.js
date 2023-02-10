const userServices = require('../services/user.service');
const { NotFoundError } = require('../../src/utils/HttpError');

const listUsers = async (_, res) => {
  const allUsers = await userServices.listUsers();
  res.status(200);
  res.json(allUsers);
};
const getUser = async (req, res) => {
  const { user_id } = req.params;
  try {
    const user = await userServices.getUser(user_id);
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

const postUser = async (req, res) => {
  const newUser = await userServices.createUser(req.body);
  res.status(201).json(newUser);
};

const deleteUser = async (req, res) => {
  await userServices.deleteUser(req.params.id);
  res.status(200).json({ message: 'User deleted' });
};

module.exports = { listUsers, postUser, deleteUser, getUser };
