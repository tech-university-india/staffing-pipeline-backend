const db = require('../models');
const logger = require('../logger');
const userServices = require('./user.service');
const projectServices = require('./project.service');

const deleteCaseStudy = async id => {
  logger.info('get case_study to be deleted with id: ' + id);
  const deletedCaseStudy = await db.case_studies.findOne({ where: { case_study_id: id } });
  if (!deletedCaseStudy) return null;
  // update the user table
  if (deletedCaseStudy.collaboratorsIds) {
    let collaborators = deletedCaseStudy.collaboratorsIds;
    await userServices.removeCaseStudyFromUser(collaborators, id);
  }
  // update the project table
  if (deletedCaseStudy.engagementId) {
    let engagement = deletedCaseStudy.engagementId;
    await projectServices.removeCaseStudyFromProject(engagement, id);
  }
  logger.info('delete case_study from database');
  await deletedCaseStudy.destroy();
  return deletedCaseStudy;
};

const updateCaseStudy = async (id, body) => {
  logger.info(`get case_study data from database for the id: ${id}`);
  const caseStudy = await db.case_studies.findOne({ where: { case_study_id: id } });
  if (!caseStudy) return null;
  if (body.collaboratorsIds) {
    let oldCollaborators = caseStudy.collaboratorsIds;
    let newCollaborators = body.collaboratorsIds;
    await userServices.updateCaseStudyInUser(oldCollaborators, newCollaborators, id);
  }

  if (body.engagementId) {
    let oldEngagement = caseStudy.engagementId;
    let newEngagement = body.engagementId;
    await projectServices.updateCaseStudyInProject(oldEngagement, newEngagement, id);
  }

  for (let key in body) {
    caseStudy[key] = body[key];
  }

  logger.info('insert updated caseStudy to the database');
  await caseStudy.save();
  return caseStudy;
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
