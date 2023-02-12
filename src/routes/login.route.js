const authRouter = require('express').Router();
const authController = require('../controllers/auth.controller');
const middlewares = require('../middlewares/login.validator');

authRouter.post('/login', middlewares.validateLoginReq, authController.loginController);
authRouter.post('/register', authController.createUserLogin);

module.exports = authRouter;
