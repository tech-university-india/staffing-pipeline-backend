const db = require('../models');
const bcrypt = require('bcrypt');
const LoginError = require('../utils/loginError');
const { HttpError } = require('../utils/httpError');
const jwt = require('jsonwebtoken');
const validateUserAndReturnToken = async data => {
  const { email, password } = data;
  const user = await db.auth.findOne({ where: { email: email } });
  if (user) {
    const isPasswordCorrect = await bcrypt.compare(password, user.dataValues.password);
    if (isPasswordCorrect) {
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

      return { data: user.dataValues, token: token, success: true, message: 'Login successful' };
    } else {
      throw new LoginError('Invalid credentials', 401);
    }
  } else {
    throw new LoginError('No such user found', 404);
  }
};
const setUserCredentials = async credentials => {
  credentials.password = await bcrypt.hash(credentials.password, parseInt(process.env.SALT_ROUNDS));
  const { email, password } = credentials;
  const user = await db.auth.findOne({ where: { email: email } });
  if (user) {
    throw new HttpError('User already exists', 400);
  }
  const result = await db.auth.create({ email, password });

  if (result) {
    return result;
  } else {
    throw new HttpError('cannot create the user', 500);
  }
};

module.exports = { validateUserAndReturnToken, setUserCredentials };
