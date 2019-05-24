/*****************************************
 * company service for BigCo, Inc.
 * 2019-01 mamund
 *****************************************/

var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser');
var routes = require('./routes');
var properties = require('./properties');
var jsUtil = require('util');
var utils = require('./utils');
var ejs = require('ejs');

// set up body parsing
router.use(bodyParser.json({type:properties.responseTypes}));
router.use(bodyParser.urlencoded({extended:properties.urlencoded}));

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.get('/',function(req,res){handler(req,res,routes.processHome,"home")});
router.post('/', function(req,res){handler(req,res,routes.processCreate,"company")});
router.get('/list/',function(req,res){handler(req,res,routes.processList,"company")});
router.get('/filter/', function(req,res){handler(req,res,routes.processFilter,"company")});
router.get('/:companyId', function(req,res){handler(req,res,routes.processItem,"company")});
router.put('/:companyId', function(req,res){handler(req,res,routes.prcoessUpdate,"company")});
router.delete('/:companyId', function(req,res){handler(req,res,routes.processDelete,"company")});
router.patch('/status/:companyId', function(req,res){handler(req,res,routes.processStatus,"company")});

module.exports = router


// handle formatting response
function handler(req, res, fn, type){
  var rtn = {};
  var xr = [];
  var oType = type||"collection";
  fn(req,res).then(function(body) {
    if(jsUtil.isArray(body)===true) {
      oType = type||"collection";
      if(body[0].type && body[0].type==="error") {
        xr.push(utils.exception(
          body[0].name,
          body[0].message,
          body[0].code,
          body[0].oType,
          'http://' + req.headers.host + req.url
        ));
        rtn = {error:xr};
      }
      else {
        rtn[oType] = body
      }
    }
    else {
      oType = type||"item";
      if(body.type && body.type==='error') {
        xr.push(utils.exception(
          body.name,
          body.message,
          body.code,
          body.oType,
          'http://' + req.headers.host + req.url
        ));
        rtn = {error:xr};
      }  
      else  {
        rtn[oType] = body;
      } 
    }
    console.log(body);
    var reply = ejs.render('{"company" : {"id":"<%= company[0].id %>"}}', {company: body});
    res.type("application/vnd.collection+json");
    res.send(reply);
    //res.send(JSON.stringify(reply,null,2));
  }).catch(function(err) {
    xr.push(utils.exception(
      "Server error",
      err.message||"Internal error",
      500,
      "error",
      'http://' + req.headers.host + req.url
    ));
    res.send(JSON.stringify({error:xr},null,2));
  });
}

