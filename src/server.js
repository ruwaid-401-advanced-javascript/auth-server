'use strict';
const express = require('express');
const morgan = require('morgan');

const error404 = require('./middleware/404');
const error500 = require('./middleware/500');
const router = require('./auth/router');


const app = express();
app.use('/docs', express.static('./docs'));
app.use('/login', express.static('./public'));
app.use(express.json());
app.use(morgan('dev'));
// app.use(express.cookieParser());


app.get('/', (req, res) => res.status(200).send('hiii  go to --->> /login  route to try github OAuth'));


app.use(router);

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