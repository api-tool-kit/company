/*****************************************
 * company service for BigCo, Inc.
 * 2019-01 mamund
 *****************************************/
 
var express = require('express');
var app = express();
var routes = require('./routes');
var port = process.env.PORT || 8484;
 
app.use('/',routes); 
app.listen(port, () => console.log(`listening on port ${port}!`));
