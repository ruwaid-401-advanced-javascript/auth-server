'use strict';

const basic = require('../../src/auth/middleware/basic-auth-middleware');
let res = {};
let next = jest.fn(); //function;

describe('basic auth ', () => {

  it('should respond with error', () => {
    let req = { headers: { authorization: null } };
    basic(req, res, next);
    expect(next).toHaveBeenCalled();
  });
  it('should respond with error', () => {
    let req = { headers: { authorization: 'Basic dasdr54sada6scac1a' } };
    basic(req, res, next);
    expect(next).toHaveBeenCalled();
  });

});

