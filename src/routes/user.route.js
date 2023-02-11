const express = require('express');
const { listUsers, postUser, deleteUser, updateUser } = require('../controllers/user.controller');
const validator = require('../middlewares/request.validator');
// require schemas
const schemas = require('../middlewares/schemas.validator');
const { updateIdValidator, updateBodyValidator } = require('../middlewares/user.update.validator');
const router = express.Router();

router.get('/users', listUsers);
router.post('/users', validator(schemas.userSchema, 'body'), postUser);
router.delete('/users/:id', deleteUser);
router.put('/users/:id', updateIdValidator, updateBodyValidator, updateUser);

module.exports = router;
