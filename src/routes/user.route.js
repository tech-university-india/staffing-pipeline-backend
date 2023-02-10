const express = require('express');
const { listUsers, createUser, deleteUser } = require('../controllers/user.controller');
const validator = require('../middlewares/request.validator');
const schemas = require('../middlewares/schemas.validator');
const router = express.Router();

router.get('/users', validator.reqAuthValidator,listUsers);
router.post('/users', validator.reqAuthValidator, createUser);
router.delete('/users/:id', validator.reqAuthValidator,deleteUser);

module.exports = router;
