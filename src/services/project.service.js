const { engagements } = require('../models');
const CustomErrors = require('../utils/httpError');

const getProject = async id => {
  const engagement = await engagements.findByPk(id);
  if (!engagement) {
    throw new CustomErrors.NotFoundError('Engagement not found');
  }
  return engagement;
};

const listProjects = async () => {
  try {
    const allProjects = await engagements.findAll();
    return allProjects;
  } catch (error) {
    console.log(error);
    throw new CustomErrors.HttpError(error.message, 500);
  }
};

const deleteProject = async id => {
  await engagements.destroy({
    where: {
      engagementId: id,
    },
  });
};

module.exports = { getProject, listProjects, deleteProject };
