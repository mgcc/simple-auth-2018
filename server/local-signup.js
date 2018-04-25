const mongoose = require('mongoose');
const User = mongoose.model('User');
const PassportLocalStrategy = require('passport-local').Strategy;

module.exports = new PassportLocalStrategy(
  { passReqToCallback: true }, (req, username, password, done) => {

  const userData = {
    username: username.trim(),
    password: password,
    name: req.body.name.trim()
  }

  const newUser = new User(userData);

  newUser.save((err) => {
    if (err) { return done(err) }

    return done(null);
  })
})
