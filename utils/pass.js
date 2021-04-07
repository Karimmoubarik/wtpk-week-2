'use strict';
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const userModel = require('../models/userModel');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// local strategy for username password login
passport.use(new Strategy(
    async (username, password, done) => {
      const params = [username];
      try {
        const [user] = await userModel.getUserLogin(params);
        console.log('Local strategy', user); // result is binary row
        if (user === undefined) {
          return done(null, false, {message: 'Incorrect email.'});
        }
        if (user.password !== password) {
          return done(null, false, {message: 'Incorrect password.'});
        }
        return done(null, {...user}, {message: 'Logged In Successfully'}); // use spread syntax to create shallow copy to get rid of binary row type
      } catch (err) {
        return done(err);
      }
    }));

// TODO: JWT strategy for handling bearer token
    passport.use(new JWTStrategy({
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret1234'
    }, async function(jwtPayload, done){
      try {
        const user = await userModel.getUser(jwtPayload.id);
        console.log('JWT Strategy', user);
        if (user === undefined) {
          return done(null, false, {message: 'Incorrect email.'});
        }
        if (user.password !== jwtPayload.password) {
          return done(null, false, {message: 'Incorrect password.'});
        }
        return done(null, {...user}, {message: 'Logged In Successfully.'});
      } catch(err){
        return done(err);
      }
    }));

module.exports = passport;
