const { engagements, users } = require('./../models');




const getProject = async (id) => {
  const found = await engagements.findByPk(id);
  return found;

};



module.exports = {  getProject };