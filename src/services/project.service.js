const { engagements } = require('../models');
const { users } = require('../models');
const HttpError = require('../utils/httpError');
const { getUserByPk, addCurrentEngagement } = require('./user.service');

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
      //get all users
      const allUsers = await Promise.all(body['userIds'].map(async userId => getUserByPk(userId)));
      //add engagementId to all users
      await Promise.all(allUsers.map(user => addCurrentEngagement(user.userId, engagement.engagementId)));
    }
    engagement[key] = body[key];
  }
  await engagement.save();
  return engagement;
};
module.exports = { getProject, listProjects, updateProject };
