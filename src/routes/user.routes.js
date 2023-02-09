
const express = require('express');
const { getUsers, getUserById } = require('../controllers/user.controller');

const schemas = require('../middlewares/schemas.validator');
const validator = require('../middlewares/request.validator');
const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:user_id', validator(schemas.userIdSchema, 'params'), getUserById);

module.exports = router;