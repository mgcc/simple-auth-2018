const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');

module.exports = new PassportLocalStrategy({ passReqToCallback: true }, (req, username, password, done) => {

  /**
   * STEPS:
   * 1. Check if the user exists
   * 2. Check if the password is correct
   */

  const userData = {
    username: username.trim(),
    password
  }

  console.log(userData);

  return User.findOne({ username }, (err, user) => {
    // Error with mongoDB
    if (err) return done(err);

    // No user found
    if (!user) {
      return done("User not found", null, null);
    }

    // Wrong password
    if (user.password !== password) {
      return done("Invalid Credentials", null, null);
    }

    // Everything checks out
    // Create a token to return to the user

    const payload = {
      _id: user._id
    }

    const token = jwt.sign(payload, 'THIS IS A SECRET')
    const data = {
      name: user.name
    }

    return done(null, token, data);
  })
});
