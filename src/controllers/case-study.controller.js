const caseStudyServices = require('../services/case-study.service');

const createCaseStudy = async (req, res) => {
  try {
    const caseStudy = await caseStudyServices.createCaseStudy(req.body);
    res.status(201).json(caseStudy);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong', success: false });
  }
};

const updateCaseStudy = async (req, res) => {
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

const deleteCaseStudy = async (req, res) => {
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

module.exports = { createCaseStudy, updateCaseStudy, deleteCaseStudy };
