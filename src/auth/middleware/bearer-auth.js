'use strict';

const usersSchema = require('../users');

function bearer(req, res, next) {

  if (!req.headers.authorization) {
    next('User is not loggedin');
    return;
  }

  let bearerToken = req.headers.authorization.split(' ').pop();

  usersSchema.verifyToken(bearerToken)
    .then(decodedUserObject => {
      req.user = decodedUserObject;
      next();
    }).catch(err => next('Protected: Invalid User Token'));

}

module.exports = bearer;