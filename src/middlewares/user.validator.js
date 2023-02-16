const Joi = require('joi');

const { HttpError } = require('../utils/httpError.js');

const uuidType = Joi.string().uuid({
  version: ['uuidv4', 'uuidv1'],
});

const updateUserIdSchema = Joi.object({
  id: uuidType.required(),
});

const updateUserBodySchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  skills: Joi.array().items(Joi.string()),
  image: Joi.string(),
});

const updateIdValidator = (req, res, next) => {
  try {
    const { error } = updateUserIdSchema.validate(req.params);
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

const updateBodyValidator = (req, res, next) => {
  try {
    const { error } = updateUserBodySchema.validate(req.body);
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
  updateIdValidator,
  updateBodyValidator,
};
