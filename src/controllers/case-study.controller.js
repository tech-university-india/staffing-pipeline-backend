
const caseStudyServices = require('../services/case-study.service');

const updateCaseStudyController = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    
    const updatedCaseStudy = await caseStudyServices.updateCaseStudy(id, body);
    
    if (!updatedCaseStudy) return res.status(404).json({ message: 'Case study not found' });
    res.status(200).json(updatedCaseStudy);
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
};

const deleteCaseStudyController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCaseStudy = await caseStudyServices.deleteCaseStudy(id);
    if (!deletedCaseStudy) return res.status(404).json({ message: 'Case study not found' });
    res.status(200).json(deletedCaseStudy);
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
};

module.exports = {
  updateCaseStudyController,
  deleteCaseStudyController,
};
