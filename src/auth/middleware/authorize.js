'use strict';

const Users = require('../users');


module.exports = (capability) => {
  return async (req, res, next) => {
    try {
      if (Users.athenticateRole(req.user, capability)) {
        next();
      } else {
        next('Access Denied');
      }
    } catch (e) {
      next('Invalid Login');
    }
  };

};
