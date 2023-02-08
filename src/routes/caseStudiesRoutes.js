const { caseStudiesRouter } = require('express').Router();
const { caseStudiesController } = require('../controllers/caseStudiesController');

caseStudiesRouter.post('/caseStudies', caseStudiesController.createCaseStudy);

module.exports = caseStudiesRouter;