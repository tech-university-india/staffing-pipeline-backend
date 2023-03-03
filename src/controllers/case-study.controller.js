const caseStudyServices = require('../services/case-study.service');
const userServices = require('../services/user.service');
const { engagements } = require('../models/');

const createCaseStudy = async (req, res) => {
  try {
    logger.info('creating a new case study');
    const caseStudy = await caseStudyServices.createCaseStudy(req.body);
    const { caseStudyId, collaboratorsIds, engagementId } = caseStudy;

    // update users case_study_ids
    for (let collabId of collaboratorsIds) {
      user = await userServices.getUser(collabId);
      console.log(user);
      user['caseStudyIds'].push(caseStudyId);
      userServices.updateUser(collabId, user);
    }

    // update engagements case_study_ids
    const engagement = await engagements.findByPk(engagementId);
    console.log(engagement);
    engagement['caseStudyIds'].push(caseStudyId);
    engagement.save();
    // Will refactor after the api is merged

    res.status(201).json(caseStudy);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Something went wrong', success: false });
  }
};

const logger = require('../logger');
const updateCaseStudy = async (req, res) => {
  try {
    logger.info('updating casestudy with id: ' + req.params.id);

    const { id } = req.params;
    const { body } = req;

    const updatedCaseStudy = await caseStudyServices.updateCaseStudy(id, body);

    if (!updatedCaseStudy) res.status(404).json({ message: 'Case study not found' });
    res.status(200).json(updatedCaseStudy);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
};

const deleteCaseStudy = async (req, res) => {
  try {
    logger.info('deleting case study with id: ' + req.params.id);
    const { id } = req.params;
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
};

module.exports = { createCaseStudy, updateCaseStudy, deleteCaseStudy };
