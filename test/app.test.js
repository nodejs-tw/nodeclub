/*!
 * nodeclub - test/app.test.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var app = require('../app');
var request = require('supertest');


describe('app.test.js', function () {

  it('should / status 200', function (done) {
    request(app)
    .get('/')
    .expect(/<title>NodeClub<\/title>/)
    .expect(200, done);
  });

});
