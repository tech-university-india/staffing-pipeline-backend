const { loginReqSchema } = require('./schemas.validator');
exports.validateLoginReq = (req, res, next) => {
  const { error } = loginReqSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.message });
  } else {
    next();
  }
};
