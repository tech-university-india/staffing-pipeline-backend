const Joi = require('joi');
const { HttpError } = require('../utils/HttpError');
const uuidType = Joi.string().uuid({
  version: [
    'uuidv4',
    'uuidv1'
  ]
});
const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  fmno: Joi.number().integer(),
  skillId: uuidType,
  caseStudyId: uuidType,
  studyId: uuidType,
  roleId: uuidType,
  guildId: uuidType
});
const idUserSchema = Joi.object({
  id: uuidType
});
const updateValidator = (req, res, next) => {
  try {
    const { error } =  updateUserSchema.validate(req.body);
    if (error) {
      throw new HttpError(error.message, 400);
    }
    next();
  }
  catch (error) {
    if(error instanceof HttpError) {
      res.status(error.status).json({ message: error.message });
    }
    else {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = {
  updateValidator,
};

