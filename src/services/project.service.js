const { engagements } = require('../models');

const CustomErrors = require('../utils/httpError');

const getProject = async projectId => {
  logger.info(`find engagement data for the id: ${id}`);
  const engagement = await engagements.findByPk(projectId);
  if (!engagement) {
    throw new CustomErrors.NotFoundError('Engagement not found');
  }
  return engagement;
};

const listProjects = async () => {
  try {
    logger.info('get all the engagements from the database');
    const allProjects = await engagements.findAll();
    return allProjects;
  } catch (error) {
    console.log(error);
    throw new CustomErrors.HttpError(error.message, 500);
  }
};

const deleteProject = async projectId => {
  await engagements.destroy({
    where: {
      engagementId: projectId,
    },
  });
};

module.exports = { getProject, listProjects, deleteProject };
