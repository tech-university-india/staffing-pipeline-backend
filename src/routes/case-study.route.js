const express = require('express');
const authMiddlewares = require('../middlewares/request.validator');
const caseStudyValidator = require('../middlewares/case-study.validator');
const { updateCaseStudyController, deleteCaseStudyController } = require('../controllers/case-study.controller');
const router = express.Router();

router.put(
  '/:id',
  authMiddlewares.reqAuthValidator,
  caseStudyValidator.CaseStudyIdValidator,
  caseStudyValidator.updateCaseStudyBodyValidator,
  updateCaseStudyController
);
router.delete(
  '/:id',
  authMiddlewares.reqAuthValidator,
  caseStudyValidator.CaseStudyIdValidator,
  deleteCaseStudyController
);

module.exports = router;
