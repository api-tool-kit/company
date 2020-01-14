/*****************************************
// bigco, inc company
// root of the service API
// 2020-02-01 : mamund
 *****************************************/
 
var express = require('express');
var app = express();
var cors = require('cors');

var resources = require('./resources');
var port = process.env.PORT || 8484;

// support calls from JS in browser
app.use(cors());
app.options('*',cors()); 

app.locals.iif = function(cond,value){
  if(cond) return value;
  return '';
}

// point to exposed resources for this API
app.use('/',resources); 

// start listening for requests
app.listen(port, () => console.log(`listening on port ${port}!`));
