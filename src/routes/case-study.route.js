const express = require('express');
const { updateCaseStudyController } = require('../controllers/case-study.controller');
const {
  updateCaseStudyIdValidator,
  updateCaseStudyBodyValidator,
} = require('../middlewares/case-study.update.validator');

const router = express.Router();

router.put('/:id', updateCaseStudyIdValidator, updateCaseStudyBodyValidator, updateCaseStudyController);

module.exports = router;
