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

module.exports = { getAllUsers, createUser};  

