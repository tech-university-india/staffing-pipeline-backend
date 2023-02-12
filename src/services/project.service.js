const { engagements, users } = require('../models');

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
  const user = await userIds.map(async uid => {
    const userData = await users.findOne({
      where: {
        userId: uid,
      },
    });
    userData.dataValues.currentEngagementIds = userData.dataValues.currentEngagementIds.filter(
      element => element !== id
    );
    return userData.dataValues;
  });
  const getUserData = await Promise.all(user);
  getUserData.map(async userElement => {
    const userData = await users.update(
      {
        currentEngagementIds: userElement.currentEngagementIds,
      },
      {
        where: {
          userId: userElement.userId,
        },
      }
    );
    return userData;
  });
  await Promise.all(getUserData);
  await engagements.destroy({
    where: {
      engagementId: id,
    },
  });
};

module.exports = { getProject, listProjects, deleteProject };
