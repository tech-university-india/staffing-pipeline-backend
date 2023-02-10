const Joi = require('joi');

const userIdSchema = Joi.object({
  user_id: Joi.string()
    .required()
    .regex(/^[0-9]*$/),
}).required();

module.exports = { userIdSchema };
