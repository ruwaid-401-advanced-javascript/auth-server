'use strict';

const error404 = require('../../src/middleware/404');
let req = {};
let res = { status: function (s) { this.status = s; return this; }, send: () => { } };
let next = jest.fn(); //function;

describe('web server', () => {
  it('should respond with 500', () => {
    error404(req, res, next);
    expect(res.status).toBe(404);
  });
});

