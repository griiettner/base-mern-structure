// @flow
const { models } = require('config').get('config').path;
const router = require('express').Router();

// User Model
const UserSession = require(`${models}/UserSession`);

// @route POST api/account/verify
// @desc Get the token and check it if is unique and user it is not deleted
// @access Public
router.get('/', (req, res) => {
  const { token } = req.query;
  const getSend = (success, message) => res.send({ success, message });

  return UserSession.find(
    {
      _id: token,
      isDeleted: false
    },
    (err, sessions) => {
      if (err) return getSend(false, `Error: Session error || ${err}`);
      if (sessions.length !== 1) return getSend(false, 'Error: Invalid Session.');

      return getSend(true, 'Success: Session is valid.');
    }
  );
});

module.exports = router;
