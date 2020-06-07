'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const Users = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

Users.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 6);
});

Users.statics.authenticate = function (username, pass) {
  return this.find({ username })
    .then(user => {
      let returnedValue = bcrypt.compare(pass, user[0].password) ? user[0] : null;
      return returnedValue;
    });
};

Users.statics.generateToken = function (user) {
  let token = jwt.sign({ username: user.username }, process.env.SECRET);
  return token;
};

Users.statics.findAll = async function () {
  return await this.find({});
};


module.exports = mongoose.model('Users', Users);