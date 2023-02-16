const { engagements } = require('../models');
const HttpError = require('../utils/httpError');
const { getUserByPk, addCurrentEngagement, removeCurrentEngagement } = require('./user.service');
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
    if (key === 'userIds') {
      const usersAlreadyInEngagement = await Promise.all(engagement.userIds.map(async userId => getUserByPk(userId)));
      // remove engagementId for users removed from engagement
      usersAlreadyInEngagement.forEach(async user => {
        if (!body['userIds'].includes(user.userId)) {
          await removeCurrentEngagement(user.userId, engagement.engagementId);
        }
      });
      //add engagementId to all users
      await Promise.all(engagement['userIds'].map(userId => addCurrentEngagement(userId, engagement.engagementId)));
      //remove engagementId from all users not in body
    }
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

module.exports = { getProject, listProjects, deleteProject, updateProject };
