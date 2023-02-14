const { engagements } = require('../models');

const getProject = async id => {
  const engagement = await engagements.findByPk(id);
  return engagement;
};

const listProjects = async () => {
  const allProjects = await engagements.findAll();
  return allProjects;
};

const getUsersFromEngagement = async id => {
  const engagement = await engagements.findOne({
    where: {
      engagementId: id,
    },
  });
  return engagement.userIds;
};

const deleteProjectFromEngagement = async id => {
  await engagements.destroy({
    where: {
      engagementId: id,
    },
  });
};

module.exports = { getProject, listProjects, deleteProjectFromEngagement, getUsersFromEngagement };
