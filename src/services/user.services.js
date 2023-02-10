const HttpError = require('../utils/httpError');
const bcrypt = require('bcrypt');
const db = require('../models');

const getAllUsers=async () => {
  try{
    const allUsers = await db.users.findAll();
    return allUsers;
  }
  catch(error){
    throw new HttpError(error.message,500);
  }
};

const createUser = async (userDetails) => {
  try{
    const newUser = await db.users.create(userDetails);
    return newUser;
  }
  catch(error){
    throw new HttpError(error.message,400);
  }

};
const setUserCredentials = async(credentials) => {
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
};
module.exports = { getAllUsers, createUser, setUserCredentials};  


