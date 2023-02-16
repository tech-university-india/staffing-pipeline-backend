const caseStudyServices = require('../services/case-study.service');
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

module.exports = {
  updateCaseStudy,
  deleteCaseStudy,
};
