const HttpError = require('../utils/httpError');
const bcrypt = require('bcrypt');
// require user model
const db = require('../models');

exports.getAllUsers=async () => {
    const allUsers = await db.Users.findAll();
    return allUsers;
  }

exports.createUser = async (userDetails) => {
    const newUser = await db.Users.create(userDetails);
    return newUser;
  }
exports.setUserCredentials = async(credentials) => {
    credentials.password = await bcrypt.hash(credentials.password, parseInt(process.env.SALT_ROUNDS));
    const { email, password} = credentials;
    const user = await db.auth.findOne({ where: { email: email } });
    if(user){
      throw new HttpError('User already exists',400);
    }
    const result = await db.auth.create({email,password});
    
    if(result){
      return result;
    }
    else{
      throw new HttpError('cannot create the user',500);
    } 
}
  


