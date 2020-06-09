'use strict';

const express = require('express');
const router = express.Router();

const usersSchema = require('./users');
const basicAuth = require('./middleware/basic-auth-middleware');
const OAuthMiddleware = require('./middleware/oauth');
router.post('/signup', async (req, res, next) => {
  try {
    let users = new usersSchema(req.body);
    let result = await users.save();
    let token = usersSchema.generateToken(result);
    res.status(200).send(token);
  } catch (e) {
    next('error username is duplicated');
  }
});

router.post('/signin', basicAuth, (req, res) => {
  res.headers.token = req.token;
  let token = req.token;
  res.cookie('token', token);
  res.status(200).json({ 'token': token, 'user': req.data });
});

router.get('/users', async (req, res) => {
  let users = await usersSchema.findAll();
  res.status(200).json({users});
});

router.get('/oauth',OAuthMiddleware, async (req, res) => {
  res.status(200).json({'token':req.token,'user':req.user});
});

module.exports = router;
