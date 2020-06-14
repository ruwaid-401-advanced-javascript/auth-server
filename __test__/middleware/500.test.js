'use strict';

const errorHandler = require('../../src/middleware/500');
let req = {};
let res = { status: function (s) { this.status = s; return this; }, json: () => { } };
let err = 'erroooorr';
let next = jest.fn(); //function;

describe('web server', () => {
  it('should respond with 500', () => {
    errorHandler(err, req, res, next);
    expect(res.status).toBe(500);
  });
});
