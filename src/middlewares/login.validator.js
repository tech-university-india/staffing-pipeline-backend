const Joi = require('joi');
const loginReqSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
exports.validateLoginReq = (req, res, next) => {
  const { error } = loginReqSchema.validate(req.body);
  if (error) {
    res.status(401).json({ message: error.message });
  } else {
    next();
  }
};
