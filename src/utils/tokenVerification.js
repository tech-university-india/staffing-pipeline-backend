const LoginError = require('../utils/loginError');
const jwt = require('jsonwebtoken');
const db = require('../models');
const verifyToken = async(token) => {
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  if (decodedToken) {
    
    const user = await db.users.findOne({ where: { email: decodedToken.email } });
    return {data:user.dataValues, success:true};
  }
  else {
    throw new LoginError('Unauthorized Token',401);
  }

};
module.exports={verifyToken};