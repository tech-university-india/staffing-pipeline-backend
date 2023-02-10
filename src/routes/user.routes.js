
const express = require('express');
const userController = require('../controllers/user.controller');
const validateRequests = require('../middlewares/request.validator');
// require schemas


const router = express.Router();

router.route('/users').get( validateRequests.reqAuthValidator,userController.getUsers)
                      .post( validateRequests.reqAuthValidator,userController.createUser);



module.exports = router;