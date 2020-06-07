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

  it('POST  /signup ', async() => {
    let testData = { 'username': 'hiHio', 'password': 'hardPassword' };
    mockRequest
      .post('/signup')
      .send(testData)
      .then(data => {
        expect(data.status).toBe(500);
      });
  });

});