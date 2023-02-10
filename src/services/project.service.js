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
  const { user_ids } = await engagements.findOne({
    where: {
      engagement_id: id,
    },
  });
  const user = await user_ids.map(async uid => {
    const user_data = await users.findOne({
      where: {
        user_id: uid,
      },
    });
    user_data.dataValues.current_engagement_ids = user_data.dataValues.current_engagement_ids.filter(
      element => element !== id
    );
    return user_data.dataValues;
  });
  const getUserData = await Promise.all(user);
  getUserData.map(async userElement => {
    const user_data = await users.update(
      {
        current_engagement_ids: userElement.current_engagement_ids,
      },
      {
        where: {
          user_id: userElement.user_id,
        },
      }
    );
    return user_data;
  });
  await Promise.all(getUserData);
  await engagements.destroy({
    where: {
      engagement_id: id,
    },
  });
};

module.exports = { getProject, listProjects, deleteProject };
