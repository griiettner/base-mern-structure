// @flow
const { models } = require('config').get('config').path;
const router = require('express').Router();

// User Model
const User = require(`${models}/User`);

// @route POST api/account/signup
// @desc Create an User
// @access Public
router.post('/', (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const getSend = (success, message) => res.send({ success, message });
  if (!firstName) return getSend(false, `Error: Missing User's First Name`);
  if (!lastName) return getSend(false, `Error: Missing User's Last Name`);
  if (!email) return getSend(false, `Error: Missing User's E-mail Address`);
  if (!password) return getSend(false, `Error: Missing User's Password`);

  const sanitazedEmail = email.toLowerCase().trim();

  return User.find(
    {
      email: sanitazedEmail
    },
    (err, previousUsers) => {
      if (err) return getSend(false, `Error: User error || ${err}`);
      if (previousUsers.length > 0) return getSend(false, 'Error: Account already exist.');

      // Save the new user
      const newUser = new User();

      newUser.email = sanitazedEmail;
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.password = newUser.generateHash(password);
      return newUser.save(error => {
        if (error) return getSend(false, `Error: On user save || ${error}.`);
        return getSend(true, 'Success: Signed Up Success');
      });
    }
  );
});

module.exports = router;
