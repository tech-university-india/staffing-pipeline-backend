const userServices = require('../services/userServices');

exports.getUsers = async (req, res) => {
  const allUsers = await userServices.getAllUsers();
  res.status(200).json(allUsers);
};
exports.createUserLogin = async(req,res)=>{
  try{
    const userCredentials = await userServices.setUserCredentials(req.body);
    res.status(201).json({success:true});
  }
  catch(error){
    
    res.status(error.statusCode).json({error:error.message,success:false});
  }
}
exports.createUser = async (req, res) => {
  try{
    
    const newUser = await userServices.createUser(req.body);
    res.status(201).json({data:newUser,success:true});
  }
  catch(error){
    res.status(error.statusCode).json({
      error:error.message
    })
  }
};

