const caseStudyServices = require('../services/case-study.service');
const logger = require('../logger');
const userServices = require('../services/user.service');
const projectServices = require('../services/project.service');
const updateCaseStudy = async (req, res) => {
  try {
    logger.info('updating caseStudy with id: ' + req.params.id);
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

module.exports = {
  updateCaseStudy,
  deleteCaseStudy,
};
