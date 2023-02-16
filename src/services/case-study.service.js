const { case_studies } = require('../models');

const deleteCaseStudy = async id => {
  const deletedCaseStudy = await case_studies.findOne({ where: { case_study_id: id } });
  if (!deletedCaseStudy) return null;
  await deletedCaseStudy.destroy();
  return deletedCaseStudy;
};

const updateCaseStudy = async (id, body) => {
  const caseStudy = await case_studies.findOne({ where: { case_study_id: id } });
  if (!caseStudy) return null;
  for (let key in body) {
    caseStudy[key] = body[key];
  }
  await caseStudy.save();
  return caseStudy;
};

const removeProjectFromCaseStudy = async projectId => {
  const result = await case_studies.update(
    {
      engagementId: null,
    },
    {
      where: {
        engagementId: projectId,
      },
    }
  );
  return result;
};

module.exports = {
  updateCaseStudy,
  deleteCaseStudy,
  removeProjectFromCaseStudy,
};
