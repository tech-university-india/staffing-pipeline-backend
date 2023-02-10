

const userServices = require('../services/user.service');

const getUsers = async (_, res) => {
  const allUsers = await userServices.getAllUsers();
  res.status(200);
  res.json(allUsers);
};
const updateUser = async (req, res) => {
  try{
    const { id } = req.params;
    const { body } = req;
    const updatedUser = await userServices.updateUser(id, body);
    if(!updatedUser) res.status(404).json({ message: 'User not found' });
    res.status(200).json(updatedUser);
  }
  catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
};
module.exports = { getUsers , updateUser};
