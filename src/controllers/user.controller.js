

const userServices = require('../services/user.service');
const { NotFoundError } = require('../../errors/httpError');

const getUsers = async (_, res) => {
  const allUsers = await userServices.getAllUsers();
  res.status(200);
  res.json(allUsers);
};
const getUserById = async (req, res) => {
  const { user_id } = req.params;
  try {
    const user = await userServices.getOneUser(user_id);
    res.status(200);
    res.json(user);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(error.errorCode);
      res.json({ message: error.message });
    } else {
      res.status(500);
      res.json({ message: 'Internal Server Error' });
    }
  }
};
module.exports = { getUsers, getUserById };