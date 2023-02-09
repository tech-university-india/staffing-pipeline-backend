const { case_studies } = require('../models');

const createCaseStudy = async (caseStudy) => {
  const newCaseStudy = await case_studies.create(caseStudy);
  return newCaseStudy;
};

module.exports = { createCaseStudy };