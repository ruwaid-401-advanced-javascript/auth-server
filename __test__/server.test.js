'use strict';

const { server } = require('../src/server');
const supergoose = require('@code-fellows/supergoose');

const mockRequest = supergoose(server);
require('dotenv').config();
let token = null;

describe('server.js', () => {

  it('404 test', () => {
    return mockRequest.get('/wrong')
      .then(data => {
        expect(data.status).toBe(404);
      });
  });

  it('500 test', () => {
    return mockRequest.get('/error500')
      .then(data => {
        expect(data.status).toBe(500);
      });
  });

  it('/ test', () => {
    return mockRequest.get('/')
      .then(data => {
        expect(data.status).toBe(200);
      });
  });


  it('/users test', () => {
    return mockRequest.get('/users')
      .then(data => {
        expect(data.status).toBe(200);
      });
  });




  it('POST  /signup ', () => {
    let testData = {
      'username': 'test user',
      'password': '55',
    };
    return mockRequest
      .post('/signup')
      .set('Content-Type', 'application/json')
      .send(testData)
      .then(data => {
        expect(data.status).toBe(200);
      });
  });

  it('/users test', () => {
    return mockRequest.get('/users')
      .then(data => {
        expect(data.status).toBe(200);
      });
  });

  it('POST with a correct encoded value /signin ', () => {
    return mockRequest
      .post('/signin')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Basic dGVzdCB1c2VyOjU1')
      .then(data => {
        token = data.body.token;
        expect(data.status).toBe(200);
      });
  });

  it('POST with a wrong encoded value  /signin ', () => {
    return mockRequest
      .post('/signin')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Basic dGVzdCBefs2VyOjU')
      .then(data => {
        expect(data.status).toBe(500);
      });
  });

  it('/read test with wrong token', () => {
    return mockRequest
      .get('/read')
      .set('Authorization', 'Bearer dGVzdCB1c2VyOjU1')
      .then(data => {
        expect(data.status).toBe(500);
      });
  });

  it('/read test with correct token', () => {
    return mockRequest
      .get('/read')
      .set('Authorization', `Bearer ${token}`)
      .then(data => {
        expect(data.status).toBe(200);
      });
  });

  it('/add test with correct token', () => {
    return mockRequest
      .post('/add')
      .set('Authorization', `Bearer ${token}`)
      .then(data => {
        expect(data.status).toBe(200);
      });
  });

  it('/remove test with correct token', () => {
    return mockRequest
      .delete('/remove')
      .set('Authorization', `Bearer ${token}`)
      .then(data => {
        expect(data.status).toBe(200);
      });
  });

});