// @flow
const { driver, uri } = require('config').get('config').database;
const express = require('express');
const cors = require('cors');

const mongoose = require(driver);
const bodyParser = require('body-parser');

const app = express();
// Use of Cors
app.use(cors());
// BodyParser Middleware
app.use(bodyParser.json());

// Connect to MongoDB via Mongoose
mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/audios', require('./routes/api/audiosApi'));
app.use('/api/account/signup', require('./routes/api/signup'));
app.use('/api/account/signin', require('./routes/api/signin'));
app.use('/api/account/verify', require('./routes/api/verify'));
app.use('/api/account/logout', require('./routes/api/logout'));
app.use('/api/account/users', require('./routes/api/usersApi'));

// Check if port is set on environment, if not, set it to port 5000
const port = process.env.PORT || 5000;

// Listening to port and logging the port number the connection occurred
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  console.log(`Server URI http://localhost:${port}`);
});
