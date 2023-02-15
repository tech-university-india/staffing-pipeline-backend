const authServices = require('../services/auth.service');
const logger = require('../logger');
const loginController = async (req, res) => {
  try {
    logger.info('call the validateUserAndReturnToken service');
    const validate = await authServices.validateUserAndReturnToken(req.body);
    res.status(200).json({ token: validate.token, success: true });
  } catch (error) {
    logger.info('error while calling authservice validateUserAndReturnToken');
    res.status(error.statusCode).json({ message: error.message, success: false });
  }
};
const createUserLogin = async (req, res) => {
  try {
    logger.info('call the setUserCredentials service');
    await authServices.setUserCredentials(req.body);
    res.status(201).json({ success: true });
  } catch (error) {
    logger.info('error while calling authservice setUserCredentials');
    res.status(error.statusCode).json({ error: error.message, success: false });
  }
};

module.exports = { loginController, createUserLogin };
