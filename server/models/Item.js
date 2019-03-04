// @flow
const { driver } = require('config').get('config').database;

const db = require(driver);

const { Schema, model } = db;

// Create Schema
const Item = model(
  'item',
  new Schema({
    name: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  })
);

module.exports = Item;
