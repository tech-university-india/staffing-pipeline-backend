const { engagements } = require('../models');

const getProject = async (id) => {
  const engagement = await engagements.findByPk(id);
  return engagement;
};

const listProjects = async () => {
  const allProjects = await engagements.findAll();
  return allProjects;
};

module.exports = { getProject, listProjects };