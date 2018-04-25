const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const Cookies = require('universal-cookie');

module.exports = (req, res, next) => {

  if (req.method === 'OPTIONS') return next()

  const authToken = req.cookies['auth-token'];
  console.log('Auth token: ' + authToken);

  // Fail if no token found
  if (!authToken) {
    res.status(401).json({ noTokenFound: true });
  }

  // decode the string using the secret phrase
  return jwt.verify(authToken, 'THIS IS A SECRET', (err, decoded) => {
    if (err) return res.status(401).end();

    const userId = decoded._id

    // check if user with that _id exists
    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        return res.status(401).end();
      }

      // else if there are no error and everything checks out, pass control to the next middleware function
      return next();
    });
  });
}
