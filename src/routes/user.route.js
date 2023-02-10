const express = require('express');
const { listUsers, postUser, deleteUser, getUser } = require('../controllers/user.controller');
const validator = require('../middlewares/request.validator');
// require schemas
const schemas = require('../middlewares/schemas.validator');

const router = express.Router();

router.get('/users', listUsers);
router.get('/users/:user_id', validator(schemas.userIdSchema, 'params'), getUser);
// router.post('/users', validator(schemas.userSchema, 'body'), postUser);
router.delete('/users/:id', deleteUser);

module.exports = router;
