const express = require('express');
const { listUsers, getUser } = require('../controllers/user.controller');

const schemas = require('../middlewares/schemas.validator');
const validator = require('../middlewares/request.validator');
const router = express.Router();

router.get('/users', listUsers);
router.get(
  '/users/:user_id',
  validator(schemas.userIdSchema, 'params'),
  getUser
);

module.exports = router;
