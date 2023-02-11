const { case_studies } = require('../models');

const updateCaseStudy = async (id, caseStudy) => {
  const updatedCaseStudy = await case_studies.findOne({ where: { case_study_id: id } });
  if (!updatedCaseStudy) return null;
  for (let key in caseStudy) {
    updatedCaseStudy[key] = caseStudy[key];
  }
  await updatedCaseStudy.save();
  return updatedCaseStudy;
};

const deleteCaseStudy = async id => {
  const deletedCaseStudy = await case_studies.findOne({ where: { case_study_id: id } });
  if (!deletedCaseStudy) return null;
  await deletedCaseStudy.destroy();
  return deletedCaseStudy;
};

module.exports = {
  updateCaseStudy,
  deleteCaseStudy,
};
