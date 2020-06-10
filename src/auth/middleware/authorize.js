'use strict';

/**
 * (Middleware) to checck the permision for the user 
 * @module authorize
 */

/**
* Input 
* @function capability
* @param capability - capability
* @param req - request
* @param res  - response
* @param next - next
* test if the user have permission to do the requested permision
*/

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
