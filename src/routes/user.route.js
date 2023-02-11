const express = require('express');
const userControllers = require('../controllers/user.controller');
const authMiddlewares = require('../middlewares/request.validator');
const router = express.Router();

router.get('/users', authMiddlewares.reqAuthValidator, userControllers.listUsers);
router.post('/users', authMiddlewares.reqAuthValidator, userControllers.createUser);
router.delete('/users/:id', authMiddlewares.reqAuthValidator, userControllers.deleteUser);

module.exports = router;
