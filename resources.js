/*****************************************
// bigco, inc
// company resources 
// 2020-02-01 : mamund
 *****************************************/

/*******************************************
// initialization and setup for DARRT
********************************************/
var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser');

var actions = require('./actions');
var representation = require('./representation');
var transitions = require('./transitions');
var utils = require('./darrt/utils');

// set up request body parsing & response templates
router.use(bodyParser.json({type:representation.getResponseTypes()}));
router.use(bodyParser.urlencoded({extended:representation.urlencoded}));

// load response templates and input forms
var templates = representation.getTemplates();
var forms = transitions.forms;

// optional tracking middleware
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now() + " : " + req.headers.host + req.url)
  next()
})

/************************************************************************/

// shared metadata for this service
var metadata = [
  {name: "title", value: "BigCo Company Records"},
  {name: "author", value: "Mike Amundsen"},
  {name: "release", value: "1.0.0"} 
];


// ***********************************************************
// public resources for the cokmpany service
// ***********************************************************
router.get('/',function(req,res){
  utils.handler(req,res,actions.home,"home", 
    {
      metadata:metadata,
      templates:templates,
      forms:forms,
      filter:"home"
    }
  )
});

router.post('/', function(req,res){
  utils.handler(req,res,actions.create,"company", 
    {
      metadata:metadata,
      templates:templates,
      forms:forms,
      filter:"home"
    }
  )
});

router.get('/list/',function(req,res){
  utils.handler(req,res,actions.list,"company", 
    {
      metadata:metadata,
      templates:templates,
      forms:forms,
      filter:"list"
    }
  )
});

router.get('/filter/', function(req,res){
  utils.handler(req,res,actions.filter,"company", 
    {
      metadata:metadata,
      templates:templates,
      forms:forms, 
      filter:"list"
    }
  )
});

router.get('/:id', function(req,res){
  utils.handler(req,res,actions.read,"company", 
    {
      metadata:metadata,
      templates:templates,
      forms:forms, 
      filter:"item"
    }
  )
});

router.put('/:id', function(req,res){
  utils.handler(req,res,actions.update,"company", 
    {
      metadata:metadata,
      templates:templates,
      forms:forms, 
      filter:"item"
    }
  )
});

router.delete('/:id', function(req,res){
  utils.handler(req,res,actions.remove,"company", 
    {
      metadata:metadata,
      templates:templates,
      forms:forms, 
      filter:"item"
    }
  )
});

router.patch('/status/:id', function(req,res){
  utils.handler(req,res,actions.status,"company", 
    {
      metadata:metadata,
      templates:templates,
      forms:forms, 
      filter:"item"
    }
  )
});

// publish the capability routes
module.exports = router
