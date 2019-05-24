/*****************************************
 * company service for BigCo, Inc.
 * 2019-01 mamund
 *****************************************/

var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser');

var routes = require('./routes');
var properties = require('./properties');
var utils = require('./utils');

// set up body parsing
router.use(bodyParser.json({type:properties.responseTypes}));
router.use(bodyParser.urlencoded({extended:properties.urlencoded}));

//set up response template
var template = properties.template;

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.get('/',function(req,res){
  utils.handler(req,res,routes.processHome,"home", template)
});

router.post('/', function(req,res){
  utils.handler(req,res,routes.processCreate,"company", template)
});

router.get('/list/',function(req,res){
  utils.handler(req,res,routes.processList,"company", template)
});

router.get('/filter/', function(req,res){
  utils.handler(req,res,routes.processFilter,"company", template)
});

router.get('/:companyId', function(req,res){
  utils.handler(req,res,routes.processItem,"company", template)
});

router.put('/:companyId', function(req,res){
  utils.handler(req,res,routes.prcoessUpdate,"company", template)
});

router.delete('/:companyId', function(req,res){
  utils.handler(req,res,routes.processDelete,"company", template)
});

router.patch('/status/:companyId', function(req,res){
  utils.handler(req,res,routes.processStatus,"company", template)
});

module.exports = router


