const tokenValidationUtil = require('../utils/token.verification');
const validator = (schema, propery) => (req, res, next) => {
  const { error } = schema.validate(req[propery]);
  if (error) {
    res.status(400);
    res.json({ message: error.message });
  } else {
    next();
  }
};
const reqAuthValidator = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
    } else {
      const isTokenValid = await tokenValidationUtil.verifyToken(token);
      if (isTokenValid.success) {
        next();
      } else {
        res.status(401).json({ message: 'Unauthorized' });
      }
    }
  } catch (error) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};
module.exports = { validator, reqAuthValidator };
