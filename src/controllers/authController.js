const authServices = require('../services/authServices');
exports.loginController = async (req, res) => {
  try {
    const validate = await authServices.validateUserAndReturnToken(req.body);
    res.status(200).json({ validate });
  }
  catch (error) {
    res.status(error.statusCode).json({ message: error.message, success: false });
  }
};
