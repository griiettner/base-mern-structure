// @flow
const { models } = require('config').get('config').path;
const router = require('express').Router();

// User Model
const User = require(`${models}/User`);
const UserSession = require(`${models}/UserSession`);

// @route POST api/account/signup
// @desc Create an User
// @access Public
router.post('/', (req, res) => {
  const { email, password } = req.body;
  const getSend = (success, message) => res.send({ success, message });
  if (!email) return getSend(false, `Error: Missing User's E-mail Address`);
  if (!password) return getSend(false, `Error: Missing User's Password`);

  const sanitazedEmail = email.toLowerCase();

  return User.find(
    {
      email: sanitazedEmail
    },
    (err, users) => {
      if (err) return getSend(false, `Error: Find User error || ${err}`);
      if (users.length !== 1) return getSend(false, 'Error: User does not exist.');

      const user = users[0];
      if (!user.validPassword(password)) return getSend(false, 'Error: Password is invalid.');

      const userSession = new UserSession();
      userSession.userId = user._id;
      return userSession.save((error, doc) => {
        if (error) return getSend(false, `Error: Save Session || ${err}`);
        return res.send({
          success: true,
          message: 'Success: Session saved',
          token: doc._id
        });
      });
    }
  );
});

module.exports = router;
