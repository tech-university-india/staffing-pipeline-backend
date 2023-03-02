const db = require('../models');
const logger = require('../logger');
const userServices = require('./user.service');
const projectServices = require('./project.service');

const deleteCaseStudy = async id => {
  logger.info('get case_study to be deleted with id: ' + id);
  const deletedCaseStudy = await db.case_studies.findOne({ where: { case_study_id: id } });
  if (!deletedCaseStudy) return null;
  let collaborators = deletedCaseStudy.collaboratorsIds;
  let engagement = deletedCaseStudy.engagementId;
  logger.info('delete case_study from database');
  await deletedCaseStudy.destroy();
  return {
    deletedCaseStudy,
    collaborators,
    engagement,
  };
};

const updateCaseStudy = async (id, body) => {
  logger.info(`get case_study data from database for the id: ${id}`);
  const caseStudy = await db.case_studies.findOne({ where: { case_study_id: id } });
  if (!caseStudy) return null;

  const oldCollaborators = caseStudy.collaboratorsIds;
  const newCollaborators = body.collaboratorsIds;
  const oldEngagement = caseStudy.engagementId;
  const newEngagement = body.engagementId;

  for (let key in body) {
    caseStudy[key] = body[key];
  }

  logger.info('insert updated caseStudy to the database');
  await caseStudy.save();
  return {
    caseStudy,
    oldCollaborators,
    newCollaborators,
    oldEngagement,
    newEngagement,
  };
};

const removeProjectFromCaseStudy = async projectId => {
  logger.info('remove project from casestudy service');
  const result = await db.case_studies.update(
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

const addCurrentEngagement = async (caseStudyId, engagementId) => {
  logger.info(`adding engagement : ${engagementId} to caseStudy: ${caseStudyId}`);
  const caseStudy = await db.case_studies.findOne({ where: { case_study_id: caseStudyId } });
  caseStudy.engagementId = engagementId;
  await caseStudy.save();
};

module.exports = {
  updateCaseStudy,
  deleteCaseStudy,
  removeProjectFromCaseStudy,
  addCurrentEngagement,
};
