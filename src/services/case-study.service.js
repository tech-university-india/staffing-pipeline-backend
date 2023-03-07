const { case_studies } = require('../models');
const db = require('../models');
const logger = require('../logger');

const createCaseStudy = async caseStudy => {
  logger.info('insert new case study into database');
  const newCaseStudy = await case_studies.create(caseStudy);
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

const getCaseStudy = async id => {
  logger.info('find case study with the given id');
  const caseStudy = await db.case_studies.findOne({ where: { case_study_id: id } });
  return caseStudy;
};

const listCaseStudies = async () => {
  logger.info('get all the case studies from the database');
  const allCaseStudies = await db.case_studies.findAll();
  console.log(allCaseStudies);
  return allCaseStudies;
};

const addCurrentEngagement = async (caseStudyId, engagementId) => {
  logger.info(`adding engagement : ${engagementId} to caseStudy: ${caseStudyId}`);
  const caseStudy = await db.case_studies.findOne({ where: { case_study_id: caseStudyId } });
  caseStudy.engagementId = engagementId;
  await caseStudy.save();
};

module.exports = {
  removeProjectFromCaseStudy,
  updateCaseStudy,
  deleteCaseStudy,
  createCaseStudy,
  removeProjectFromCaseStudy,
  getCaseStudy,
  listCaseStudies,
  addCurrentEngagement,
};
