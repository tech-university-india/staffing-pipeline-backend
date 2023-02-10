const validator = (schema, propery) => (req, res, next) => {
  const { error } = schema.validate(req[propery]);
  if (error) {
    res.status(400);
    res.json({ message: error.message });
  } else {
    next();
  }
};

module.exports = validator;
