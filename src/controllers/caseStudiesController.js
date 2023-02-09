const caseStudiesServices = require('../services/caseStudies.service');

const createCaseStudy = async (req, res) => {
  try {
    const caseStudy = await caseStudiesServices.createCaseStudy(req.body);
    res.status(201).json({ caseStudy });
  }
  catch (error) {
    res.status(error.statusCode).json({ message: error.message, success: false });
  }
};

module.exports = { createCaseStudy };