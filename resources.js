/*****************************************
 * bigco company
 * resource definitions
 * 2019-01 mamund
 *****************************************/

var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser');

var actions = require('./actions');
var representation = require('./representation');
var utils = require('./darrt/utils');

// set up request body parsing & response templates
router.use(bodyParser.json({type:representation.responseTypes}));
router.use(bodyParser.urlencoded({extended:representation.urlencoded}));
var templates = representation.templates;

// optional tracking middleware
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now() + " : " + req.headers.host + req.url)
  next()
})

// ****************************************
// RESOURCES
// URL handlers
// ****************************************

// the actions/capabilities of this service API
router.post('/', function(req,res){
  utils.handler(req,res,actions.create,"company", templates)
});

router.get('/list/',function(req,res){
  utils.handler(req,res,actions.list,"company", templates)
});

router.get('/filter/', function(req,res){
  utils.handler(req,res,actions.filter,"company", templates)
});

router.get('/:companyId', function(req,res){
  utils.handler(req,res,actions.read,"company", templates)
});

router.put('/:companyId', function(req,res){
  utils.handler(req,res,actions.update,"company", templates)
});

router.delete('/:companyId', function(req,res){
  utils.handler(req,res,actions.remove,"company", templates)
});

router.patch('/status/:companyId', function(req,res){
  utils.handler(req,res,actions.status,"company", templates)
});

router.get('/',function(req,res){
  utils.handler(req,res,actions.home,"home", templates)
});

// publish the capability routes
module.exports = router


