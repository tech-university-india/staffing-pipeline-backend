const authRouter = require('express').Router();
const { loginController } = require('../controllers/auth.controller');
const { validateLoginReq } = require('../middlewares/login.validator');

authRouter.post('/login', validateLoginReq, loginController);
module.exports = authRouter;
