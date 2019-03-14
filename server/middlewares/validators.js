const Joi = require('joi');
const jwt = require('jsonwebtoken');

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


exports.validateToken = (req, res, next) => {
  const secret = process.env.SECRET;
  const token = req.body.token
      || req.query.token
      || req.headers['token'];
  if (!token) {
    return res.status(401).send({ message: 'User not authorized' });
  }
  jwt.verify(token, secret, (error, decoded) => {
    if (error) {
      return res.status(401).send({
        message: 'Token authentication failed'
      });
    }
    req.user = decoded.token.user;
    next();
  });
};

exports.groupValidator =  (req, res, next) => {
  let schema = Joi.object().keys({
    name: Joi.string().trim().required().error(() => 'Group name is required'),
  });

  Joi.validate(req.body, schema, (error, data) => {
    if (error) {
      const message = error.details[0].message;
      res.status(400).send({ message });
    } else {
      next();
    }
  });
}
