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

const deleteProject = async projectId => {
  logger.info('deleteing project with id: ' + projectId);
  await db.engagements.destroy({
    where: {
      engagementId: projectId,
    },
  });
};

module.exports = { getProject, listProjects, deleteProject };
