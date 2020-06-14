'use strict';

const { server } = require('../src/server');
const supergoose = require('@code-fellows/supergoose');

const mockRequest = supergoose(server);

describe('server.js', () => {
  it('404 test' , ()=> {
    return mockRequest.get('/wrong')
      .then(data => {
        expect(data.status).toBe(404);
      });
  });

  it('500 test' , ()=> {
    return mockRequest.get('/error500')
      .then(data => {
        expect(data.status).toBe(500);
      });
  });

  it('/users test' , ()=> {
    return mockRequest.get('/users')
      .then(data => {
        expect(data.status).toBe(200);
      });
  });

  it('POST  /signup ', () => {
    let testData = {
      'username':'test user',
      'password': '55',
    };
    return mockRequest
      .post('/signup')
      .set('Content-Type','application/json')
      .send(testData)
      .then(data => {    
        expect(data.status).toBe(500);
      });
  });

  it('/users test' , ()=> {
    return mockRequest.get('/users')
      .then(data => {
        // console.log(data.body,'---------------ddddddd');

        expect(data.status).toBe(200);
      });
  });

  it('POST  /signin ', () => {
    let testData = {
      'username':'test user',
      'password': 55,
    };
    return mockRequest
      .post('/signin')
      .set('Content-Type','application/json')
      .set('Authorization', 'Basic dGVzdCB1c2VyOjU1')
      .send(testData)
      .then(data => {
        // console.log(data,'---------------ddddddd');
        
        expect(data.status).toBe(500);
      });
  });

});