const { case_studies } = require('../models');
const logger = require('../logger');
const updateCaseStudy = async (id, body) => {
  logger.info(`get case_study data from database for the id: ${id}`);
  const caseStudy = await case_studies.findOne({ where: { case_study_id: id } });
  if (!caseStudy) return null;
  for (let key in body) {
    caseStudy[key] = body[key];
  }
  logger.info("insert updated caseStudy to the Database");
  await caseStudy.save();
  return caseStudy;
};

module.exports = {
  updateCaseStudy,
};
