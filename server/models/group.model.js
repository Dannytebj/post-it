const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: { type: String, required: true },
  messages: [{
    type: Schema.Types.ObjectId,
    ref: 'Message'
  }],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Group', groupSchema);
