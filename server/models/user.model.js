const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required:true },
  email: { type: String, required:true },
  groups: [{
    type: Schema.Types.ObjectId,
    ref: 'Group'
  }]
});

module.exports = mongoose.model('User', userSchema);
