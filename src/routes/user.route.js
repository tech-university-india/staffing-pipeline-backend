const express = require('express');

const validator = require('../middlewares/request.validator');
// require schemas
const schemas = require('../middlewares/schemas.validator');
const { updateIdValidator, updateBodyValidator } = require('../middlewares/user.update.validator');

const userControllers = require('../controllers/user.controller');
const authMiddlewares = require('../middlewares/request.validator');
const router = express.Router();

router.get('/users', authMiddlewares.reqAuthValidator, userControllers.listUsers);
router.post('/users', authMiddlewares.reqAuthValidator, userControllers.createUser);
router.delete('/users/:id', authMiddlewares.reqAuthValidator, userControllers.deleteUser);
router.put('/users/:id', updateIdValidator, updateBodyValidator, userControllers.updateUser);

module.exports = router;
