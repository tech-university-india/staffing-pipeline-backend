const updateCaseStudyServices = require('../services/case-study.service');

const updateCaseStudyController = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updatedCaseStudy = await updateCaseStudyServices.updateCaseStudy(id, body);
    if (!updatedCaseStudy) return res.status(404).json({ message: 'CaseStudy not found' });
    res.status(200).json(updatedCaseStudy);
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
};

module.exports = {
  updateCaseStudyController,
};
