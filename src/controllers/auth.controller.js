const authServices = require('../services/auth.service');
const logger = require('../logger');
const loginController = async (req, res) => {
  try {
    logger.info('fetching token and validating user');
    const validate = await authServices.validateUserAndReturnToken(req.body);
    res.status(200).json({ token: validate.token, success: true });
  } catch (error) {
    logger.error(error);
    res.status(error.statusCode).json({ message: error.message, success: false });
  }
};
const createUserLogin = async (req, res) => {
  try {
    logger.info('creating user credentials');
    await authServices.setUserCredentials(req.body);
    res.status(201).json({ success: true });
  } catch (error) {
    logger.error(error);
    res.status(error.statusCode).json({ error: error.message, success: false });
  }
};

module.exports = { loginController, createUserLogin };
