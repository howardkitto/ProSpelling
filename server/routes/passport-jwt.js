const jwt = require('jsonwebtoken');
const User = require('../models/User')

var passport = require("passport");
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
opts.audience = 'prospelling.com';

var strategy = new JwtStrategy(opts, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);

var user = User.findById(jwt_payload.sub, function(err, user) {
  if (err) {
      return done(err, false);
  }
  if (user) {
      return done(null, user);
  } else {
      return done(null, false);
      // or you could create a new account
  }
});
})


module.exports = strategy




// /**
//  * Return the Passport Local Strategy object.
//  */
// module.exports = new JwtStrategy({
//   usernameField: 'email',
//   passwordField: 'password',
//   session: false,
//   passReqToCallback: true
// }, (req, email, password, done) => {
//   const userData = {
//     email: email.trim(),
//     password: password.trim()
//   };

//   // find a user by email address
//   return User.findOne({ email: userData.email }, (err, user) => {
//     if (err) { return done(err); }

//     if (!user) {
//       const error = new Error('Incorrect email or password');
//       error.name = 'IncorrectCredentialsError';

//       return done(error);
//     }

//     // check if a hashed user's password is equal to a value saved in the database
//     return user.comparePassword(userData.password, (passwordErr, isMatch) => {
//       if (err) { return done(err); }

//       if (!isMatch) {
//         const error = new Error('Incorrect email or password');
//         error.name = 'IncorrectCredentialsError';

//         return done(error);
//       }

//       const payload = {
//         sub: user._id
//       };

//       // create a token string
//       const token = jwt.sign(payload, config.jwtSecret);
//       const data = {
//         name: user.name
//       };

//       return done(null, token, data);
//     });
//   });
// });
