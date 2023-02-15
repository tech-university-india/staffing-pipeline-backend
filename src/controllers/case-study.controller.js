const updateCaseStudy = require('../services/case-study.service');
const logger = require('../logger');
const updateCaseStudyController = async (req, res) => {
  try {
    logger.info('call the updateCaseStudy service');
    const { id } = req.params;
    const { body } = req;

    const updatedCaseStudy = await caseStudyServices.updateCaseStudy(id, body);

    if (!updatedCaseStudy) return res.status(404).json({ message: 'Case study not found' });
    res.status(200).json(updatedCaseStudy);
  } catch (error) {
    logger.info('error while calling updateCallStudy service');
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
};

const deleteCaseStudy = async (req, res) => {
  try {
    logger.info('Call the deleteCaseStudy service');
    const { id } = req.params;
    const deletedCaseStudy = await caseStudyServices.deleteCaseStudy(id);
    if (!deletedCaseStudy) return res.status(404).json({ message: 'Case study not found' });
    res.status(200).json(deletedCaseStudy);
  } catch (error) {
    logger.info('Error in calling deleteCaseStudy service');
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
};

module.exports = {
  updateCaseStudyController,
  deleteCaseStudy,
};
