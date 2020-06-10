'use strict';
/**
 * @module extraRoute
 */

const express = require('express');
const router = express.Router();

const bearerMiddleware = require('./middleware/bearer-auth');
const permissions = require('./middleware/bearer-auth');


router.get('/secret', bearerMiddleware,secretfunc);
router.get('/read', bearerMiddleware, permissions('read'), readfunc);
router.post('/add', bearerMiddleware, permissions('create'), addfunc);
router.put('/change', bearerMiddleware, permissions('update'), changefunc);
router.delete('/remove', bearerMiddleware, permissions('delete'), removefunc);



function secretfunc(req,res){
  res.status(200).send('you know our secret now ---Welcome---');
}


function readfunc(req,res){
  res.status(200).send('Do you see this? if yes so you have the permission to read');
}

function addfunc(req,res){
  res.status(200).send('Do you see this? if yes so you have the permission to add');
}

function changefunc(req,res){
  res.status(200).send('Do you see this? if yes so you have the permission to change');
}

function removefunc(req,res){
  res.status(200).send('Do you see this? if yes so you have the permission to remove');
}

module.exports = router;
