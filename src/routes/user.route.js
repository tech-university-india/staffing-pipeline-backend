const express = require('express');

const requestValidator = require('../middlewares/request.validator');
const schemas = require('../middlewares/schemas.validator');

const { updateIdValidator, updateBodyValidator } = require('../middlewares/user.validator');

const userControllers = require('../controllers/user.controller');
const authMiddlewares = require('../middlewares/request.validator');
const router = express.Router();

router.get('/users', authMiddlewares.reqAuthValidator, userControllers.listUsers);
router.get(
  '/users/:userId',
  authMiddlewares.reqAuthValidator,
  requestValidator.validate(schemas.userIdSchema, 'params'),
  userControllers.getUser
);

router.post('/users', authMiddlewares.reqAuthValidator, userControllers.createUser);
router.delete('/users/:id', authMiddlewares.reqAuthValidator, userControllers.deleteUser);
router.put(
  '/users/:id',
  authMiddlewares.reqAuthValidator,
  updateIdValidator,
  updateBodyValidator,
  userControllers.updateUser
);

module.exports = router;
