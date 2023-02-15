const { engagements } = require('../models');
const { users } = require('../models');
const HttpError = require('../utils/httpError');
const { getUserByPk, addCurrentEngagement, removeCurrentEngagement } = require('./user.service');

const getProject = async id => {
  const engagement = await engagements.findByPk(id);
  return engagement;
};

const listProjects = async () => {
  const allProjects = await engagements.findAll();
  return allProjects;
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
const deleteProject = async id => {
  await engagements.destroy({
    where: {
      engagementId: id,
    },
  });
};

module.exports = { getProject, listProjects, deleteProject, updateProject };
