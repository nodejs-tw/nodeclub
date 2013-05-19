/*jslint node: true, regexp: true, nomen: true, indent: 2, vars: true */

/* node.bcrypt.js adoptions:
 * bcrypt.genSalt(rounds, seed_length, callback: (err, salt) => any)
 * bcrypt.hash(data, salt, callback: (err, encrypted) => any)
 * bcrypt.compare(data, encrypted, callback: (err, same) => any)
 */

'use strict';

var crypto = require('crypto');

var PBKDF2 = {
  keylen: 256,
  iterations: 4096,
};

PBKDF2.genSalt = function (size, callback) {
  crypto.randomBytes(size, function (err, buf) {
    if (err) {
      return callback(err);
    }
    return callback(null, buf.toString('base64'));
  });
};

PBKDF2.hash = function (data, salt, callback) {
  // For iteration count settings, see:
  // http://security.stackexchange.com/questions/3959/recommended-of-iterations-when-using-pkbdf2-sha256
  crypto.pbkdf2(data, salt, PBKDF2.iterations, PBKDF2.keylen, function (err, derivedKey) {
    if (err) {
      return callback(err);
    }
    // derivedKey is string, but stores binary data
    var buffer = new Buffer(derivedKey);
    return callback(null, buffer.toString('hex'), salt);
  });
}

PBKDF2.compare = function (data, encrypted, salt, callback) {
  PBKDF2.hash(data, salt, function (err, hash) {
    if (err) {
      return callback(err);
    }
    return callback(null, (encrypted === hash));
  });
}

module.exports = PBKDF2;
