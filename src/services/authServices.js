const db = require('../models');
const bcrypt = require('bcrypt');
const LoginError = require('../utils/loginError');
const tokenVerificationUtil = require('../utils/tokenVerification');
const jwt = require('jsonwebtoken');
const validateUserAndReturnToken = async(data) => {
    const { email, password } = data;
    const user = await db.auth.findOne({ where: { email: email } });
    if (user) {
        const isPasswordCorrect = await bcrypt.compare(password, user.dataValues.password);
        if (isPasswordCorrect) {
            const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            
            return {data:user.dataValues,token:token,success:true,message:'Login successful'};
        }
        else {
            throw new LoginError('Invalid credentials',401);
        }
    }
    else{
        throw new LoginError('No such user found',404);
    }   
}

module.exports={validateUserAndReturnToken};