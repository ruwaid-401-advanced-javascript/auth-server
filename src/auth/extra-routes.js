'use strict';
/**
 * @module extraRoute
 */

const express = require('express');
const router = express.Router();

const bearerMiddleware = require('./middleware/bearer-auth');

router.get('/', bearerMiddleware, (req,res) => {
  res.status(200).send('you know our secret now ---Welcome---');
} );

module.exports = router;
