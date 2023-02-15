const Joi = require('joi');

const uuidType = Joi.string().uuid({
  version: ['uuidv4', 'uuidv1'],
});

const userIdSchema = Joi.object({
  userId: uuidType.required(),
}).required();

const userSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  fmno: Joi.number().integer().required(),
  skillId: uuidType.required(),
  caseStudyId: uuidType.required(),
  studyId: uuidType.required(),
  roleId: uuidType.required(),
  guildId: uuidType.required(),
});
const loginReqSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
module.exports = { userSchema, loginReqSchema, userIdSchema };
