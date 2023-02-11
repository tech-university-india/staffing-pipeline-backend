const { case_studies } = require('../models');

const updateCaseStudy = async (id, caseStudy) => {
  const updatedCaseStudy = await case_studies.findOne({ where: { id } });
  if (!updatedCaseStudy) return null;
  for (let key in caseStudy) {
    updatedCaseStudy[key] = caseStudy[key];
  }
  await updatedCaseStudy.save();
  return updatedCaseStudy;
};

module.exports = {
  updateCaseStudy,
};
