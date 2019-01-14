const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    maxlength: 20,
    unique: true,
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
