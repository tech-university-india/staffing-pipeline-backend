const authRouter = require('express').Router();
const authController = require('../controllers/authController');
const middlewares = require('../middlewares/login.validation');

authRouter.post('/login',middlewares.validateLoginReq,authController.loginController);
module.exports = authRouter;