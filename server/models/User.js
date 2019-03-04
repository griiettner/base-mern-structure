// @flow
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// Create Schema
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    default: ''
  },
  lastName: {
    type: String,
    required: true,
    default: ''
  },
  email: {
    type: String,
    required: true,
    default: ''
  },
  password: {
    type: String,
    required: true,
    default: ''
  },
  date: {
    type: Date,
    default: Date.now
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};
UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = model('User', UserSchema);
