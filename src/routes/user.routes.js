
const express = require('express');
const { getUsers, getUserById } = require('../controllers/user.controller');

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:user_id', getUserById);

module.exports = router;