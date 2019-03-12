const Joi = require('joi');

exports.validateUser = (req, res, next) => {
  let schema = Joi.object().keys({
    name: Joi.string().trim().required().error(() => 'Name is required'),
    email: Joi.string().regex(/\S+@\S+\.\S+/).trim().error(() => 'Invalid email address')
  });

  Joi.validate(req.body, schema, (error, data) => {
    if (error) {
      const message = error.details[0].message;
      res.status(400).send({ message });
    } else {
      next();
    }
  });
};
