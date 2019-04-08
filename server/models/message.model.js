const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  message: { type: String, required: true },
  group: {
    type: Schema.Types.ObjectId,
    ref: 'Group'
  },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Message', messageSchema);
