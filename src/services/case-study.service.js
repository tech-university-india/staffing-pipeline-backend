const { case_studies, users, engagements } = require('../models');

const updateUserFk = async (collaboratorsIds, caseStudyId) => {
  for (let collabId of collaboratorsIds) {
    const user = await users.findByPk(collabId);
    //console.log(user);
    //console.log('dsfdsf');
    user.dataValues['case_studies_ids'].push(caseStudyId);
    user.save();
  }
};

const updateEngagementFk = async (engagementId, caseStudyId) => {
  const engagement = await engagements.findByPk(engagementId);
  console.log(engagement);
  engagement['caseStudyIds'].push(caseStudyId);
  engagement.save();
};

const createCaseStudy = async caseStudy => {
  //console.log(caseStudy);
  const newCaseStudy = await case_studies.create(caseStudy);
  //console.log(newCaseStudy);
  const { caseStudyId, collaboratorsIds, engagementId } = newCaseStudy.dataValues;

  // update users case_study_ids
  updateUserFk(collaboratorsIds, caseStudyId);

  console.log(engagementId);
  // update engagements case_study_ids
  updateEngagementFk(engagementId, caseStudyId);

  return newCaseStudy;
};

module.exports = { createCaseStudy };
