/*****************************************
 * company service for BigCo, Inc.
 * 2019-01 mamund
 *****************************************/

var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser');

var actions = require('./actions');
var properties = require('./properties');
var utils = require('./utils');

// set up body parsing
router.use(bodyParser.json({type:properties.responseTypes}));
router.use(bodyParser.urlencoded({extended:properties.urlencoded}));

//set up response template
var templates = properties.templates;

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.get('/',function(req,res){
  utils.handler(req,res,actions.home,"home", templates)
});

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

module.exports = router


