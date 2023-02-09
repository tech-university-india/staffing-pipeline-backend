
const express = require('express');
const userController = require('../controllers/userController');
const validateRequests = require('../middlewares/request.validator');
// require schemas
const schemas = require('../middlewares/schemas.validator');

const router = express.Router();

router.route('/users').get( validateRequests.reqAuthValidator,userController.getUsers)
  .post( validateRequests.reqAuthValidator,userController.createUser);
router.post('/users/register', userController.createUserLogin);


module.exports = router;