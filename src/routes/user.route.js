const express = require('express');

// require schemas
const schemas = require('../middlewares/schemas.validator');
const { updateIdValidator, updateBodyValidator } = require('../middlewares/user.validator');

const userControllers = require('../controllers/user.controller');
const authMiddlewares = require('../middlewares/request.validator');
const router = express.Router();

router.get('/users', authMiddlewares.reqAuthValidator, userControllers.listUsers);
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
