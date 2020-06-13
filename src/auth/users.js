'use strict';

/**
 * User schema
 * @module user
 */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

/**
 * Users schema
 * @property {string} username 
 * @property {string} passwoord
 */
const Users = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
});

Users.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 2);
});


/**
 * @method athenticateRole
 * @param {string} user
 * @param {string} capability
 */

Users.statics.athenticateRole = function (user, capability) {
  let roles = {
    user: ['read'],
    writers: ['read', 'create'],
    editors: ['read', 'update', 'create'],
    Administrators: ['read', 'update', 'create', 'delete'],
  }; 
  return !!roles[user.capabilities].includes(capability);
};

/**
 * @method authenticate
 * @param {string} username
 * @param {string} password
 */
Users.statics.authenticate = function (username, pass) {
  return this.find({ username })
    .then(async (user) => {
      return bcrypt.compare(pass, user[0].password) ? user[0] : null;
    });
};

/**
 * @method generateToken
 * @param {object} user
 * @returns {string} token
 */
Users.statics.generateToken =  function (user) {
  let expire = process.env.EXPIRE;
  let token = jwt.sign({
    id: user.id,
    capabilities: user.role,
  }, process.env.SECRET, {expiresIn:expire});
  return token;
};

/**
 * @method findAll
 * find all saved users in DB
 */
Users.statics.findAll = function () {
  return this.find({});
};

/**
 * @method findOneByUser
 * @param {string} username
 */
Users.statics.findOneByUser = function (username) {
  return this.find({ username });
};

/**
 * @method verifyToken
 * @param {string} token
 */
Users.statics.verifyToken = async function (token) {
  
  return jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) {
      return Promise.reject(err);
    }    
    if (decoded.id) {
      return Promise.resolve(decoded);
    } else {
      return Promise.reject();
    }
  });
};

module.exports = mongoose.model('Users', Users);