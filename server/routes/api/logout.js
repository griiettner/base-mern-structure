// @flow
const { models } = require('config').get('config').path;
const router = require('express').Router();

// User Model
const UserSession = require(`${models}/UserSession`);

// @route POST api/account/verify
// @desc Get the token and check it if is unique and user it is not deleted
// @access Public
router.delete('/', (req, res) => {
  const { token } = req.query;
  const getSend = (success, message) => res.send({ success, message });
  console.log(token);
  return UserSession.findOne({ _id: token })
    .then(item => {
      console.log(item);
      return item.remove().then(() => getSend(true, 'Success: User logged out.'))
    })
    .catch(err => getSend(false, err));
});

// router.delete('/:id', (req, res) => {
//   console.log(req);
//   const { token } = req.query;
//   UserSession.findById(token)
//     .then(item => item.remove().then(() => res.json({ success: true })))
//     .catch(err => res.status(404).json({ success: false, message: err }));
// });

module.exports = router;
