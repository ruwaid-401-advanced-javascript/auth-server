'use strict';

const usersSchema = require('../users');
const superagent = require('superagent');
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const tokenServerUrl = 'https://github.com/login/oauth/access_token';
const remoteUserApi = 'https://api.github.com/user';

const API_SERVER = 'http://localhost:3000/oauth';

async function getUserGeneratTokenAddToDB(req, res, next) {

  try {
    let code = req.query.code;

    let remoteToken = await exchangeCodeForToken(code);

    let remoteUser = await getRemoteUserInfo(remoteToken);

    let [user, token] = await getUser(remoteUser);
    req.user = user;
    req.token = token;
    next();

  } catch (e) {
    console.log(`ERROR: ${e}`);
    next('erroOoOoOoOr');
  }

}


async function exchangeCodeForToken(code) {
  let tokenResponse = await superagent.post(tokenServerUrl).send({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: code,
    redirect_uri: API_SERVER,
  });
  let access_token = tokenResponse.body.access_token;
  return access_token;
}

async function getRemoteUserInfo(token) {
  let userResponse = await superagent
    .get(remoteUserApi)
    .set('Authorization', `token ${token}`)
    .set('user-agent', 'express-app');

  let user = userResponse.body; 
  return user;
}

async function getUser(remoteUser) {
  let userRecord = {
    username: remoteUser.login, 
    password: 'anyThing',
  };
  let savedUser = null;
  try {
    let users = new usersSchema(userRecord);
    savedUser = await users.save();
  } catch (e) {
    savedUser = await  usersSchema.findOneByUser(userRecord.username);
  }

  let myServerToken = usersSchema.generateToken(userRecord);
  return [savedUser, myServerToken]; 


}

module.exports = getUserGeneratTokenAddToDB;
