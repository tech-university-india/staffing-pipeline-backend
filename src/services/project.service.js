const { engagements } = require('../models');
const logger = require('../logger');
const getProject = async id => {
  logger.info(`find engagement data for the id: ${id}`);
  const engagement = await engagements.findByPk(id);
  return engagement;
};

const listProjects = async () => {
  logger.info('get all the engagements from the database');
  const allProjects = await engagements.findAll();
  return allProjects;
};

const deleteProject = async id => {
  await engagements.destroy({
    where: {
      engagementId: id,
    },
  });
};

module.exports = { getProject, listProjects, deleteProject };
