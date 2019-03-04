// @flow
const { Schema, model } = require('mongoose');

// Create Schema
const UserSessionSchema = new Schema({
  userId: {
    type: String,
    ref: 'User',
    default: ''
  },
  timestamp: {
    type: Date,
    default: Date.now()
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

module.exports = model('UserSession', UserSessionSchema);
