// require joi
const Joi = require('joi');
const uuidType = Joi.string().uuid({
  version: ['uuidv4', 'uuidv1'],
});

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

module.exports = { userSchema };
