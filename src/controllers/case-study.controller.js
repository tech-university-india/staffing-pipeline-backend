const caseStudyServices = require('../services/case-study.service');
const userServices = require('../services/user.service');
const logger = require('../logger');
const projectServices = require('../services/project.service');

const createCaseStudy = async (req, res) => {
  try {
    logger.info('creating a new case study');
    const caseStudy = await caseStudyServices.createCaseStudy(req.body);
    const { caseStudyId, collaboratorsIds, projectId } = caseStudy.dataValues;

    // update users case_study_ids
    for (let collabId of collaboratorsIds) {
      user = await userServices.getUser(collabId);
      console.log(user);
      user.dataValues['caseStudyIds'].push(caseStudyId);
      user.save();
    }

    // update engagements case_study_ids
    const project = await projectServices.getProject(projectId);
    console.log(project);
    project.dataValues['caseStudyIds'].push(caseStudyId);
    project.save();

    res.status(201).json(caseStudy);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Something went wrong', success: false });
  }
};

const updateCaseStudy = async (req, res) => {
  try {
    logger.info('updating casestudy with id: ' + req.params.id);

    const { id } = req.params;
    const { body } = req;
    await userServices.updateCaseStudyInUser(id, body);
    await projectServices.updateCaseStudyInProject(id, body);
    const caseStudy = await caseStudyServices.updateCaseStudy(id, body);
    if (!caseStudy) res.status(404).json({ message: 'Case study not found' });
    res.status(200).json(caseStudy);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteCaseStudy = async (req, res) => {
  try {
    try {
      logger.info('deleting case study with id: ' + req.params.id);
      const { id } = req.params;
      await userServices.removeCaseStudyFromUser(id);
      await projectServices.removeCaseStudyFromProject(id);
      const deletedCaseStudy = await caseStudyServices.deleteCaseStudy(id);
      if (!deletedCaseStudy) {
        res.status(404).json({ message: 'Case study not found' });
      }
      res.status(200).json(deletedCaseStudy);
    } catch (error) {
      logger.error(error);
      res.status(500).json({
        message: 'Something went wrong',
      });
    }
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
};

const getCaseStudy = async (req, res) => {
  try {
    const { id } = req.params;
    logger.info('fetching case study by id: ' + id);
    const caseStudy = await caseStudyServices.getCaseStudy(id);
    if (!caseStudy) throw new Error('Case study not found');
    res.status(200).json(caseStudy);
  } catch (error) {
    logger.error(error);
    res.status(404).json({
      message: error.message,
    });
  }
};

const listCaseStudies = async (req, res) => {
  try {
    logger.info('fetching all the case studies');
    const allCaseStudies = await caseStudyServices.listCaseStudies();
    res.status(200).json(allCaseStudies);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
};

module.exports = {
  createCaseStudy,
  updateCaseStudy,
  deleteCaseStudy,
  getCaseStudy,
  listCaseStudies,
};
