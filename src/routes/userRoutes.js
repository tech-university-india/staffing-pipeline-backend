
const express = require('express');
const userController = require('../controllers/userController');
const validator = require('../middlewares/request.validator');
// require schemas
const schemas = require('../middlewares/schemas.validator');

const router = express.Router();

router.get('/users', userController.getUsers);
router.post('/users', userController.createUser);
router.post('/users/register',userController.createUserLogin);


module.exports = router;