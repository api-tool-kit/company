/*****************************************
// DARRT Framework
// auth0 support
// 2020-02-01 : mamund
 *****************************************/

// modules 
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
var jwtAuthz = require('express-jwt-authz');
var utils = require('./utils.js');

// auth variables
var auth = {};
auth.cache = true;
auth.rateLimit = true;
auth.requestsPerMinute = 5;
auth.jwksUri = 'https://mamund.auth0.com/.well-known/jwks.json';
auth.audience = 'http://mamund.com/bigco-company';
auth.issuer = 'https://mamund.auth0.com/';
auth.algorithms = ['RS256'];

// auth support
var jwtCheck = jwt({
  secret : jwks.expressJwtSecret({
    cache: auth.cache,
    rateLimit: auth.rateLimit,
    jwksRequestsPerMinute: auth.requestsPerMinute,
    jwksUri: auth.jwksUri
  }),
  audience: auth.audience,
  issuer: auth.issuer,
  algorithms: auth.algorithms
});

// export
module.exports = {
  auth, 
  jwtCheck,
  jwtAuthz
};


