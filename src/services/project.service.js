const { engagements } = require('../models');
const { HttpError } = require('../utils/httpError');
const db = require('../models');
const logger = require('../logger');
const CustomErrors = require('../utils/httpError');

const getProject = async projectId => {
  logger.info(`find engagement data for the id: ${projectId}`);
  const engagement = await db.engagements.findByPk(projectId);
  if (!engagement) {
    throw new CustomErrors.NotFoundError('Engagement not found');
  }
  return engagement;
};

const listProjects = async () => {
  try {
    logger.info('get all the engagements from the database');
    const allProjects = await db.engagements.findAll();
    return allProjects;
  } catch (error) {
    logger.error({ error: error, text: 'error in fetching all the engagements from the database' });
    throw new CustomErrors.HttpError(error.message, 500);
  }
};

const updateProject = async (id, body) => {
  const engagement = await engagements.findByPk(id);
  if (!engagement) {
    throw new HttpError('Project not found', 404);
  }
  for (let key in body) {
    engagement[key] = body[key];
  }
  await engagement.save();
  return engagement;
};

const deleteProject = async projectId => {
  logger.info('deleteing project with id: ' + projectId);
  await db.engagements.destroy({
    where: {
      engagementId: projectId,
    },
  });
};

const updateCaseStudyInProject = async (caseStudyId, body) => {
  logger.info('updating case study in project');
  const caseStudy = await db.case_studies.findOne({ where: { case_study_id: caseStudyId } });
  if (!caseStudy) return;
  const oldEngagement = caseStudy.engagementId;
  const newEngagement = body.engagementId;
  if (oldEngagement) {
    let engagement = await db.engagements.findOne({ where: { engagementId: oldEngagement } });
    if (engagement) {
      // remove the case study from the old engagement
      let caseStudies = engagement.caseStudyIds;
      caseStudies = caseStudies.filter(id => id !== caseStudyId);
      engagement.caseStudyIds = caseStudies;
      await engagement.save();
    }
  }
  if (newEngagement) {
    let engagement = await db.engagements.findOne({ where: { engagementId: newEngagement } });
    if (engagement) {
      // add the case study to the new engagement
      engagement.caseStudyIds = [...engagement.caseStudyIds, caseStudyId];
      await engagement.save();
      engagement = await db.engagements.findOne({ where: { engagementId: newEngagement } });
    }
  }
};

const removeCaseStudyFromProject = async caseStudyId => {
  const caseStudy = await db.case_studies.findOne({ where: { case_study_id: caseStudyId } });
  if (!caseStudy) return;
  const engagementId = caseStudy.engagementId;
  logger.info('removing case study from project');
  if (engagementId) {
    let engagement = await db.engagements.findOne({ where: { engagementId: engagementId } });
    if (engagement) {
      // remove the case study from the old engagement
      let caseStudies = engagement.caseStudyIds;
      caseStudies = caseStudies.filter(id => id !== caseStudyId);
      engagement.caseStudyIds = caseStudies;
      await engagement.save();
    }
  }
};

const createProject = async body => {
  try {
    logger.info('creating project');
    return await db.engagements.create(body);
  } catch (error) {
    logger.error({ error: error, text: 'error in creating an engagement and adding it to the database' });
    throw new CustomErrors.HttpError(error.message, 500);
  }
};

module.exports = {
  getProject,
  listProjects,
  deleteProject,
  updateProject,
  updateCaseStudyInProject,
  removeCaseStudyFromProject,
  createProject,
};
