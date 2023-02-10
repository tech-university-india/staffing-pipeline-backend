const authRouter = require('express').Router();
const {loginController} = require('../controllers/authController');
const {validateLoginReq} = require('../middlewares/login.validation');

authRouter.post('/login', validateLoginReq, loginController);
module.exports = authRouter;
