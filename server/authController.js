
const passport = require('passport');

exports.signup = (req, res, next) => {
  // do some form validation
  // return error 400 if validation failed


  return passport.authenticate('local-signup', (err) => {
    // generic error
    if (err) {
      console.log(err);
      return res.status(400).json({
        success: false,
        message: 'Unable to sign up.'
      })
      // return error 400
    }

    // Some things to check for:
    // 1. User already exists
    // 2. Missing fields

    // if there are no error, return status 200
    return res.status(200).json({
      success: true,
      message: 'Sign up successful!'
    });

  })(req, res, next);
}

exports.login = (req, res, next) => {
  // validate login details...

  return passport.authenticate('local-login', (err, token, userData) => {
    if (err || !token) {
      return res.status(400).json({
        success: false,
        message: err
      });
    }

    return res.json({
      success: true,
      message: 'Successfully logged in!',
      token,
      userData
    });

  })(req, res, next);
}
