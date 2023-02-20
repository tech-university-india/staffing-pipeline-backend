const Joi = require('joi');
const { HttpError } = require('../utils/httpError');

const projectSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  tags: Joi.array().items(Joi.string()),
  skills: Joi.array().items(Joi.string()),
  guild: Joi.string(),
  userIds: Joi.array().items(Joi.string()),
  caseStudyIds: Joi.array().items(Joi.string()),
  status: Joi.string().min(3).max(30),
  startDate: Joi.date(),
  endDate: Joi.date(),
  image: Joi.string().min(3),
});

const validateProject = (req, res, next) => {
  const { error } = projectSchema.validate(req.body);
  if (error) {
    throw new HttpError(error.message, 400);
  }
  next();
};

module.exports = { validateProject };
