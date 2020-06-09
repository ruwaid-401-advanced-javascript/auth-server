'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const Users = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

Users.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 2);
});

Users.statics.authenticate =  function (username, pass) {
  return this.find({ username })
    .then(async(user) => {     
      let returnedValue = await bcrypt.compare(pass, user[0].password) ? user[0] : null;
      return returnedValue;
    });
};

Users.statics.generateToken = function (user) {
  let token = jwt.sign({ username: user.username }, process.env.SECRET, { expiresIn: 60 * 15 });
  return token;
};

Users.statics.findAll = async function () {
  return await this.find({});
};

Users.statics.findOneByUser = async function (username) {
  return await this.find({ username });
};

Users.statics.verifyToken = async function (token) {
  return jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) {
      return Promise.reject(err);
    }
    if (decoded.username) {
      return Promise.resolve(decoded);
    } else {
      return Promise.reject();
    }
  });
};

module.exports = mongoose.model('Users', Users);