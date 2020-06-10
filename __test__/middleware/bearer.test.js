'use strict';

const bearer = require('../../src/auth/middleware/bearer-auth');
let res = {};
let next = jest.fn(); //function;

describe('basic auth ', () => {

  it('should respond with error', () => {
    let req = { headers: { authorization: null } };
    bearer(req, res, next);
    expect(next).toHaveBeenCalled();
  });
  it('should respond with error', () => {
    let req = { headers: { authorization: 'Basic dasdr54sada6scac1a' } };
    bearer(req, res, next);
    expect(next).toHaveBeenCalled();
  });

});

