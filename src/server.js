'use strict';
const express = require('express');

const error404 = require('../middleware/404');
const error500 = require('../middleware/500');

const app = express();
app.use('/docs', express.static('./docs'));
app.use(express.json());

app.get('/', (req, res) => res.status(200).send('hiii'));



app.get('/error500',fakeError);
function fakeError(req,res,next){
  next('wooow ther is an error');
}

app.use(error404);
app.use(error500);


module.exports = {
  server: app,
  start:  (portNumber) => app.listen(portNumber, () => console.log(`Listnening to PORT ${portNumber}`)),
};