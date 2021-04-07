'use strict';
const jwt = require('jsonwebtoken');
const passport = require('passport');

const login = (req, res) => {
  // TODO: add passport authenticate
  passport.authenticate('local', {session: false}, (err, user, info) => {
    if(err || !user){
      return res.status(400).json({
        message: 'pieleen meni',
      });
    }

    req.login(user, {session: false}, (err) => {
      if(err)
        res.send(err);
    })

    const token = jwt.sign(user, 'secret1234');
    return res.json({user, token})
  })(req, res);
};

module.exports = {
  login,
};