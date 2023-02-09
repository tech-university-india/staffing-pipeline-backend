const caseStudiesRouter = require('express').Router();
const caseStudiesController = require('../controllers/caseStudies.controller');

caseStudiesRouter.post('/', caseStudiesController.createCaseStudy);

module.exports = { caseStudiesRouter };