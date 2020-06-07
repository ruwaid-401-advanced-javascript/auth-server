'use strict';

const users = require('../users');
const base64 = require('base-64');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    next('invalid Login -- missing requierd parameters');
    return;
  }
  let basic = req.headers.authorization.split(' ').pop();
  let [user, pass] = base64.decode(basic).split(':');

  users.authenticate(user, pass)
    .then(validUser => {
      req.token = users.generateToken(validUser);
      req.data = validUser;
      next();
      return;
    })
    .catch(err => next('Invalid Login!!'));

};