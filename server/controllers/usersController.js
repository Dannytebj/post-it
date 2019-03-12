const User = require('../models/user.model');
const generateToken = require('../utils/generateToken');


/**
 * Creates a new User
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.create = async (req, res, next) => {
  const { email, name } = req.body;
  try {
    const user = await User.findOne({ email })
    if (user) {
      return res.status(409).send({
        message: 'This user already exists'
      });
    }
    const newUser = await new User({
      name,
      email
    });
      const savedUser = await newUser.save();
      return res.status(201).send({
        message: 'User created successfully',
        token: generateToken(savedUser)
      });
  }
  catch (error) {
    next(error);
  }
}

/**
 * gets a token when a user is signed in
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.getUserToken = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if(!user) {
      return res.status(401).send({
        message: 'This user does not exist'
      })
    }
    res.status(201).send({
      message: 'User auth successful',
      token: generateToken(user)
    });
  }
  catch(error) {
    next(error);
  }
};