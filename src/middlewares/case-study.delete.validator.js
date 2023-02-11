const Joi = require('joi');

const { HttpError } = require('../utils/HttpError');

const uuidType = Joi.string().uuid({
  version: ['uuidv4', 'uuidv1'],
});

const deleteCaseStudyIdSchema = Joi.object({
  id: uuidType.required(),
});

const deleteCaseStudyIdValidator = (req, res, next) => {
  try {
    const { error } = deleteCaseStudyIdSchema.validate(req.params);
    if (error) {
      throw new HttpError(error.message, 400);
    }
    next();
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.status).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = {
  deleteCaseStudyIdValidator,
};
