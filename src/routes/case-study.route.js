const express = require('express');
const { updateCaseStudyController } = require('../controllers/case-study.controller');
const { updateCaseStudyIdValidator, updateCaseStudyBodyValidator } = require('../middlewares/case-study.validator');
const authMiddlewares = require('../middlewares/request.validator');

const router = express.Router();

router.put(
  '/:id',
  authMiddlewares.reqAuthValidator,
  updateCaseStudyIdValidator,
  updateCaseStudyBodyValidator,
  updateCaseStudyController
);

module.exports = router;
