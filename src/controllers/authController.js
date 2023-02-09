const authServices = require('../services/authServices');
const loginController = async(req, res) => {
    try{
        const validate = await authServices.validateUserAndReturnToken(req.body); 
        res.status(200).json({ token:validate.token , success:true});
    }
    catch (error) {
        res.status(error.statusCode).json({ message: error.message,success:false });
    }
}

module.exports = { loginController};