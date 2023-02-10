const userServices = require('../services/user.service');
const { NotFoundError } = require('../../errors/httpError');

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
module.exports = { listUsers, getUser };
