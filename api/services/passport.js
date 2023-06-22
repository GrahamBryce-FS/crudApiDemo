const passport = require('passport');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local');

const User = require('../models/user');
const config = require('../config');

const localOptions = { usernameField: 'email' }

const localStrategy = new LocalStrategy(localOptions, async (email, password, done) => {
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return done(null, false);
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

// original code
// const localStrategy = new LocalStrategy(localOptions, function(email,password,password,done) {
//   User.findOne({email:email}, function(error,user){
//     if(error) { return done(error) }
//     if(!user) { return done(null, false) }
//     user.comparePassword(password, function(error, isMatch){
//       if(error) { return done(error) }
//       if(!isMatch) { return done(null, false) }
//       return done(null,user);
//     })
//   })
// })

const jwtOptions = {
  secretOrKey: config.secret,
  jwtFromRequest: ExtractJwt.fromHeader('authorization')
};

const jwtStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await User.findById(payload.sub);
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (error) {
    done(error, false);
  }
});


passport.use(localStrategy);
passport.use(jwtStrategy);
// const passport = require('passport');
// const ExtractJwt = require('passport-jwt').ExtractJwt;
// const JwtStrategy = require('passport-jwt').Strategy;

// const User = require('../models/user')
// const config = require('../config')

// const jwtOptions = {
//   secretOrKey: config.secret,
//   jwtFromRequest: ExtractJwt.fromHeader('authorization')
// }

// const jwtStrategy = new JwtStrategy(jwtOptions, function(payload,done){
//   User.findById(payload.sub, function(error,user){
//     if(error){ return done(error,false)}
//     if(user) {
//       done(null,user)
//     }else{
//       done(null,false)
//     }
//   })
// })

// passport.use(jwtStrategy)