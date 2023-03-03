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

const createProject = async body => {
  try {
    logger.info('creating project');
    return await db.engagements.create(body);
  } catch (error) {
    logger.error({ error: error, text: 'error in creating an engagement and adding it to the database' });
    throw new CustomErrors.HttpError(error.message, 500);
  }
};

module.exports = { getProject, listProjects, deleteProject, updateProject, createProject };
