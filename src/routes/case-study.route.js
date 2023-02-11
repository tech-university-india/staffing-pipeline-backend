const express = require('express');
const { updateCaseStudyController, deleteCaseStudyController } = require('../controllers/case-study.controller');
const {
  updateCaseStudyIdValidator,
  updateCaseStudyBodyValidator,
} = require('../middlewares/case-study.update.validator');

const { deleteCaseStudyIdValidator } = require('../middlewares/case-study.delete.validator');

const router = express.Router();

router.put('/:id', updateCaseStudyIdValidator, updateCaseStudyBodyValidator, updateCaseStudyController);
router.delete('/:id', deleteCaseStudyIdValidator, deleteCaseStudyController);

module.exports = router;
