/*!
 * nodeclub - test/app.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var app = require('../app');
var request = require('supertest');


describe('app.js', function () {

  before(function (done) {
    app.listen(0, done);
  });
  after(function () {
    app.close();
  });

  it('should / status 200', function (done) {
    request(app)
    .get('/')
    .expect(200, done);
  });

});
