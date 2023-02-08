const { CaseStudies } = require('../models');

const createCaseStudy = async (caseStudy) => {
  const newCaseStudy = await CaseStudies.create(caseStudy);
  return newCaseStudy;
};

module.exports = { createCaseStudy };