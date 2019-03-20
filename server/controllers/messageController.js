const Message = require('../models/message.model');
const Group = require('../models/group.model');
const io = require('../utils/socketConfig');

exports.createMessage = async (req, res, next) => {
  const { message, groupId } = req.body;
  const { user } = req;
  try {
    const groupModel = await Group.findOne({ _id: groupId })
    if (!groupModel) {
      return res.status(404).send({
        message: 'This group does not exist',
      });
    }
    const newMessage = await new Message({
      message,
      group: groupId,
      createdBy: user.name
    });
    const savedMessage = await newMessage.save();
    groupModel.messages.push(savedMessage._id);
    await groupModel.save();
    // emit real-time message for all group members
    io.emit(`message:${groupId}`, savedMessage);

    return res.status(201).send({
      message: 'created successfully',
      message: savedMessage
    });
  } catch (error) {
    next(error);
  }
}