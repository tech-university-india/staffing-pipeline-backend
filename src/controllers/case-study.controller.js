const { updateCaseStudy } = require('../services/case-study.service');

const updateCaseStudyController = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updatedCaseStudy = await updateCaseStudy(id, body);
    if (!updatedCaseStudy) return res.status(404).send('Case study not found');
    res.status(200).json(updatedCaseStudy);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  updateCaseStudyController,
};
