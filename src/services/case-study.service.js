const { case_studies } = require('../models');
const userService = require('./user.service');
const db = require('../models');
const logger = require('../logger');

const createCaseStudy = async caseStudy => {
  logger.info('insert new case study into database');
  const newCaseStudy = await case_studies.create(caseStudy);
  const { caseStudyId, collaboratorsIds, engagementId } = newCaseStudy.dataValues;

  // update users case_study_ids
  for (let collabId of collaboratorsIds) {
    user = userService.getUser(collabId);
    user.dataValues['case_studies_ids'].push(caseStudyId);
    userService.updateUser(collabId, user);
  }

  // update engagements case_study_ids
  const engagement = await engagements.findByPk(engagementId);
  engagement['caseStudyIds'].push(caseStudyId);
  engagement.save();
  // Will refactor after the api is merged

  return newCaseStudy;
};

const deleteCaseStudy = async id => {
  logger.info('get case_study to be deleted with id: ' + id);
  const deletedCaseStudy = await db.case_studies.findOne({ where: { case_study_id: id } });
  if (!deletedCaseStudy) return null;
  await deletedCaseStudy.destroy();
  return deletedCaseStudy;
};

const updateCaseStudy = async (id, body) => {
  logger.info(`get case_study data from database for the id: ${id}`);
  const caseStudy = await db.case_studies.findOne({ where: { case_study_id: id } });
  if (!caseStudy) return null;
  for (let key in body) {
    caseStudy[key] = body[key];
  }
  logger.info('insert updated caseStudy to the database');
  await caseStudy.save();
  return caseStudy;
};

const removeProjectFromCaseStudy = async projectId => {
  logger.info('remove project from casestudy service');
  const result = await db.case_studies.update(
    {
      engagementId: null,
    },
    {
      where: {
        engagementId: projectId,
      },
    }
  );
  return result;
};

module.exports = {
  removeProjectFromCaseStudy,
  updateCaseStudy,
  deleteCaseStudy,
  createCaseStudy,
};
