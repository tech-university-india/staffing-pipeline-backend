const { engagements } = require('../models');
const users = require('../models/users');
const HttpError = require('../utils/httpError');

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
      const allUsers = await Promise.all(
        body['userIds'].map(async userId => {
          const user = await users.findByPk(userId);
          if (!user) {
            throw new HttpError(`User: ${userId} not found`, 404);
          }
          return user;
        })
      );
      await Promise.all(
        allUsers.map(user => {
          if (user.currentEngagementIds.includes(engagement.engagementId)) {
            return user;
          }
          user.currentEngagementIds.push(engagement.engagementId);
          return user.save();
        })
      );
    }
    engagement[key] = body[key];
  }
  await engagement.save();
  return engagement;
};
module.exports = { getProject, listProjects, updateProject };
