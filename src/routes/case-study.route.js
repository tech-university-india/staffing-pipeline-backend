const express = require('express');

const authMiddlewares = require('../middlewares/request.validator');
const caseStudyValidator = require('../middlewares/case-study.validator');
const { updateCaseStudyController, deleteCaseStudyController } = require('../controllers/case-study.controller');
const { updateCaseStudyIdValidator, updateCaseStudyBodyValidator } = require('../middlewares/case-study.validator');
const authMiddlewares = require('../middlewares/request.validator');


const router = express.Router();

router.put(
  '/:id',
  authMiddlewares.reqAuthValidator,
  caseStudyValidator.caseStudyIdValidator,
  caseStudyValidator.updateCaseStudyBodyValidator,
  updateCaseStudyController
);
router.delete(
  '/:id',
  authMiddlewares.reqAuthValidator,
  caseStudyValidator.caseStudyIdValidator,
  deleteCaseStudyController
);


module.exports = router;
