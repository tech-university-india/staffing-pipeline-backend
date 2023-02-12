const { engagements } = require('../models');
const { deleteProjectFromUser } = require('./user.service');

const getProject = async id => {
  const engagement = await engagements.findByPk(id);
  return engagement;
};

const listProjects = async () => {
  const allProjects = await engagements.findAll();
  return allProjects;
};

const deleteProject = async id => {
  const { userIds } = await engagements.findOne({
    where: {
      engagementId: id,
    },
  });
  deleteProjectFromUser(userIds, id);
  await engagements.destroy({
    where: {
      engagementId: id,
    },
  });
};

module.exports = { getProject, listProjects, deleteProject };
