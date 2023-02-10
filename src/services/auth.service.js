const db = require('../models');
const bcrypt = require('bcrypt');
const LoginError = require('../utils/loginError');
const jwt = require('jsonwebtoken');
exports.validateUserAndReturnToken = async data => {
  const { email, password } = data;
  const user = await db.users.findOne({ where: { email: email } });

  if (user) {
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return { data: user, token: token, success: true, message: 'Login successful' };
    } else {
      throw new LoginError('Invalid credentials', 401);
    }
  } else {
    throw new LoginError('No such user found', 404);
  }
};
