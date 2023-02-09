const caseStudiesRouter = require('express').Router();
const caseStudiesController = require('../controllers/caseStudiesController');

caseStudiesRouter.post('/', caseStudiesController.createCaseStudy);

module.exports = { caseStudiesRouter };