const { engagements } = require('../models');

const getProject = async (id) => {
  const engagement = await engagements.findByPk(id);
  return engagement;

};

module.exports = { getProject };