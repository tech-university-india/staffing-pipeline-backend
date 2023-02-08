const { engagements } = require('./../models');


const listProjects = async () => {
  const allProjects = await engagements.findAll();
  return allProjects;

};

const getProject = async (id) => {
  const found = await engagements.findByPk(id);
  return found;

};


module.exports = { listProjects, getProject };