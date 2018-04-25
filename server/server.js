const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser('some'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

// Initialize mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/simple-auth', (err) => {
  if (!err) { console.log('Connected to MongoDB'); }
});
require('./UserModel');

 // CORS
app.use(function(req, res, next) {
  // the value of this header can't be a wildcard when header credentials are included
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Authorization, Access-Control-Request-Method, Access-Control-Request-Headers');

  res.setHeader('Cache-Control', 'no-cache');
  next();
});

/**
 * SERVER TASKS
 * 1. Accept sign up requests and add new users to database
 * 2. Give out tokens to authenticated clients attempting to log in
 * 3. Verify validity of tokens sent by clients
 *
 */

//  Set Up passport strategies
const localSignUpStrategy = require('./local-signup');
const localLogInStrategy = require('./local-login');
passport.use('local-signup', localSignUpStrategy);
passport.use('local-login', localLogInStrategy);

// set up sign up / log in routes
const authController = require('./authController');
app.post('/signup', authController.signup);
app.post('/login', authController.login);

// Set up route that needs login
const authCheck = require('./authCheck');
app.use('/get-secret-data', authCheck);
app.get('/get-secret-data', (req, res) => {
  console.log('Accessing authorized content');
  res.json({ data: 'If you are seeing this, then that means you are logged in' });
});

app.listen(3001, (err) => {
  if (!err) console.log('API running on http://localhost:3001');
});
