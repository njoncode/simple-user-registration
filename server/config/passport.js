const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/User');

const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET

console.log('Passport Executing!')


passport.use(User.createStrategy());

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY,
};



passport.use(new JwtStrategy(options, function(jwtPayload, done) {

    console.log('🛻🚓🚎🐴🚜🐶🐭jwtPayload: ', jwtPayload);
      User.findById(jwtPayload.sub, function(err, user) {
      // If there was failure
        if (err) {
          console.log('Passport: Some error occurred')
          return done(err, false);
        }
        // If user was found with this id
        if (user) {
          // Since we are here, the JWT is valid and our user is valid, so we are authorized!
          console.log('Passport: User found: ', user)
          return done(null, user);
        } else {
          // If no user was found
          console.log('Passport: User not found')
          return done(null, false);
        }
    });
}));




