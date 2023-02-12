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
    const user_data = await users.findOne({
      where: {
        userId: uid,
      },
    });
    user_data.dataValues.currentEngagementIds = user_data.dataValues.currentEngagementIds.filter(
      element => element !== id
    );
    return user_data.dataValues;
  });
  const getUserData = await Promise.all(user);
  getUserData.map(async userElement => {
    const user_data = await users.update(
      {
        currentEngagementIds: userElement.currentEngagementIds,
      },
      {
        where: {
          userId: userElement.userId,
        },
      }
    );
    return user_data;
  });
  await Promise.all(getUserData);
  await engagements.destroy({
    where: {
      engagementId: id,
    },
  });
};

module.exports = { getProject, listProjects, deleteProject };
