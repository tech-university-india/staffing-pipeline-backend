const db = require('../models');
const logger = require('../logger');
const userServices = require('./user.service');
const projectServices = require('./project.service');

const deleteCaseStudy = async id => {
  logger.info('get case_study to be deleted with id: ' + id);
  const deletedCaseStudy = await db.case_studies.findOne({ where: { case_study_id: id } });
  if (!deletedCaseStudy) return null;
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

module.exports = {
  updateCaseStudy,
  deleteCaseStudy,
  removeProjectFromCaseStudy,
};
