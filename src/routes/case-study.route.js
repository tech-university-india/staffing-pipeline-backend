const caseStudiesRouter = require('express').Router();
const caseStudiesController = require('../controllers/case-study.controller');

caseStudiesRouter.post('/', caseStudiesController.createCaseStudy);

module.exports = { caseStudiesRouter };