const db = require('../models');
const bcrypt = require('bcrypt');
const LoginError = require('../utils/loginError');
const { HttpError } = require('../utils/httpError');
const jwt = require('jsonwebtoken');
const logger = require('../logger');
const validateUserAndReturnToken = async data => {
  const { email, password } = data;
  logger.info(`get the user data from database auth table by passing email: ${email}`);
  const user = await db.auth.findOne({ where: { email: email } });
  if (user) {
    logger.info('check if password is correct by comparing entered password with the one present in database');
    const isPasswordCorrect = await bcrypt.compare(password, user.dataValues.password);
    if (isPasswordCorrect) {
      logger.info('generate jwt token and return');
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

      return { data: user.dataValues, token: token, success: true, message: 'Login successful' };
    } else {
      logger.error('password is not correct');
      throw new LoginError('Invalid credentials', 401);
    }
  } else {
    logger.error(`no such user was found with email: ${email}`);
    throw new LoginError('No such user found', 404);
  }
};
const setUserCredentials = async credentials => {
  logger.info('hash the password');
  credentials.password = await bcrypt.hash(credentials.password, parseInt(process.env.SALT_ROUNDS));
  const { email, password } = credentials;
  logger.info(`get the user data from database auth table by passing email: ${email}`);
  const user = await db.auth.findOne({ where: { email: email } });
  if (user) {
    logger.error(`user already exists with email: ${email}`);
    throw new HttpError('User already exists', 400);
  }
  logger.info(`create user with email: ${email} and password: ${password}`);
  const result = await db.auth.create({ email, password });

  if (result) {
    return result;
  } else {
    logger.error('user not created');
    throw new HttpError('cannot create the user', 500);
  }
};

module.exports = { validateUserAndReturnToken, setUserCredentials };
