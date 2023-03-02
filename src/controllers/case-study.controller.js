const caseStudyServices = require('../services/case-study.service');
const logger = require('../logger');
const userServices = require('../services/user.service');
const projectServices = require('../services/project.service');
const updateCaseStudy = async (req, res) => {
  try {
    logger.info('updating casestudy with id: ' + req.params.id);
    const { id } = req.params;
    const { body } = req;

    const { caseStudy, oldCollaborators, newCollaborators, oldEngagement, newEngagement } =
      await caseStudyServices.updateCaseStudy(id, body);

    if (newCollaborators) {
      await userServices.updateCaseStudyInUser(oldCollaborators, newCollaborators, id);
    }

    if (newEngagement) {
      await projectServices.updateCaseStudyInProject(oldEngagement, newEngagement, id);
    }

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
    logger.info('deleting case study with id: ' + req.params.id);
    const { id } = req.params;
    const { deletedCaseStudy, collaborators, engagement } = await caseStudyServices.deleteCaseStudy(id);
    if (collaborators) {
      await userServices.removeCaseStudyFromUser(collaborators, id);
    }
    if (engagement) {
      await projectServices.removeCaseStudyFromProject(engagement, id);
    }
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

module.exports = {
  updateCaseStudy,
  deleteCaseStudy,
};
