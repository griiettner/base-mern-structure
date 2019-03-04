// @flow
const { models } = require('config').get('config').path;
const router = require('express').Router();

// User Model
const User = require(`${models}/User`);
const UserSession = require(`${models}/UserSession`);

// @route GET api/account/users
// @desc Get All Users
// @access Public
router.get('/', (req, res) => {
  User.find().then(users => res.json(users));
});

// @route POST api/account/users?token=<TOKEN_ID>
// @desc Get user by the token
// @access Public
router.get('/getByToken/:id', (req, res) => {
  UserSession.findById(req.params.id)
    .then(session => {
      User.findById(session.userId).then(user => res.json(user));
    })
    .catch(err => res.status(404).json({ success: false, message: err }));
});

// @route POST api/items
// @desc Create an Item
// @access Public
router.post('/', (req, res) => {
  const newItem = new User({
    name: req.body.name
  });

  newItem.save().then(item => res.json(item));
});

// @route DELETE api/items/:id
// @desc Delete an Item
// @access Public
router.delete('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false, message: err }));
});

module.exports = router;
