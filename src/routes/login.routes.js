const authRouter = require('express').Router();
const authController = require('../controllers/auth.controller');
const middlewares = require('../middlewares/login.validation');
const db = require('../models');

authRouter.post('/login', middlewares.validateLoginReq, authController.loginController);
authRouter.post('/register', authController.createUserLogin);
authRouter.get('/', async(req, res) => {
    res.send(await db.auth.findAll());
})
module.exports = authRouter;
