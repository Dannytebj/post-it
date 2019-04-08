const Group = require('../models/group.model');
const User = require('../models/user.model');
const transformName = require('../utils/transformName');

/**
 * Creates a group
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.createGroup = async (req, res, next) => {
  const { name } = req.body;
  const { user } = req;
  try {
    const newGroup = await new Group({
      name: transformName(name),
      createdBy: user._id,
    })
    newGroup.users.push(user._id);
    const group = await newGroup.save();
    const userModel = await User.findOne({ _id: user._id });
    userModel.groups.push(group._id);
    await userModel.save();

    return res.status(201).send({
      message: 'Group created successfully',
      group
    });
  } catch (error) {
    // Error 11000 is thrown when duplicate data 
    // is violated on the db.
    if (error.code === 11000) {
      return res.status(409).send({ message: 'Group name already taken!' })
    }
    next();
  }
}

/**
 * Returns a user's groups
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.groups = async (req, res, next) => {
  const { user } = req;
  try {
    const userGroups = await User.findOne({ _id: user._id })
      .populate('groups', '_id, name');

    return res.status(200).send({
      message: 'Groups fetched successfully',
      groups: userGroups.groups
    });

  } catch (error) {
    next(error);
  }
}

/**
 * Returns the users in a group
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.groupUsers = async (req, res, next) => {
  const { id } = req.params;
  try {
    const group = await Group.findOne({ _id: id });
    if (!group) {
      return res.status(404).send({
        message: 'This group does not exist',
      });
    }
    const groupUsers = await Group.findOne({ _id: id })
      .populate('users', '-groups')
      .populate('createdBy', 'name');

    return res.status(200).send({
      message: 'fetched successfully',
      users: groupUsers.users,
      createdBy: groupUsers.createdBy
    });
  } catch (error) {
    next(error);
  }
}

exports.group = async (req, res, next) => {
  const { id } = req.params;
  try {
    const groupExists = await Group.findOne({ _id: id });
    if (!groupExists) {
      return res.status(404).send({
        message: 'This group does not exist',
      });
    }
    const group = await Group.findOne({ _id: id })
      .select('-messages')
      .populate('users', '-groups')
      .populate('createdBy', 'name');

    return res.status(200).send({
      message: 'Fetched successfully',
      group
    }); 

  } catch (error) {
    console.log(error);
    next(error);
  }
}
