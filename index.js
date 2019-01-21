/*****************************************
 * company service for BigCo, Inc.
 * 2019-01 mamund
 *****************************************/
 
var express = require('express');
var app = express();
var company = require('./company');
var port = process.env.PORT || 8484;
 
app.use('/company',company);
app.listen(port, () => console.log(`company svc listening on port ${port}!`));
