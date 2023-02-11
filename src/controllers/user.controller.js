const userServices = require('../services/user.service');

const listUsers = async (_, res) => {
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
module.exports = { listUsers, postUser, deleteUser, updateUser };
