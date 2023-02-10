const express = require('express');
const { getUsers, updateUser } = require('../controllers/user.controller');
const { updateValidator } = require('../middlewares/update.user.validator');

const router = express.Router();

router.get('/users', getUsers);

router.put('/users/:id', updateValidator, updateUser);

module.exports = router;
