const Joi = require('joi');

const { HttpError } = require('../utils/HttpError');

const uuidType = Joi.string().uuid({
  version: ['uuidv4', 'uuidv1'],
});

const caseStudyIdSchema = Joi.object({
  id: uuidType.required(),
});

const updateCaseStudyBodySchema = Joi.object({
  name: Joi.string().min(3).max(30),
  description: Joi.string(),
  collaborators_ids: Joi.array().items(uuidType),
  image: Joi.string(),
  box_link: Joi.string(),
  skills: Joi.array().items(Joi.string()),
  engagement_id: Joi.array().items(uuidType),
});

const caseStudyIdValidator = (req, res, next) => {
  try {
    const { error } = caseStudyIdSchema.validate(req.params);
    if (error) {
      throw new HttpError(error.message, 400);
    }
    next();
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

const updateCaseStudyBodyValidator = (req, res, next) => {
  try {
    const { error } = updateCaseStudyBodySchema.validate(req.body);
    if (error) {
      throw new HttpError(error.message, 400);
    }
    next();
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = {
  caseStudyIdValidator,
  updateCaseStudyBodyValidator,
};
