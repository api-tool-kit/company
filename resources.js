/*****************************************
// bigco, inc company
// resources 
// 2020-02-01 : mamund
 *****************************************/

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

// load shared metadata
var metadata = [
  {name: "title", value: "BigCo Company Records"},
  {name: "author", value: "Mike Amundsen"},
  {name: "release", value: "1.0.0"}, 
  {name: "self", value: "{fullurl}"}
];

// optional tracking middleware
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now() + " : " + req.headers.host + req.url)
  next()
})

// here are the exposed resources to manage state for this API
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

router.get('/:companyId', function(req,res){
  utils.handler(req,res,actions.read,"company", 
    {
      metadata:metadata,
      templates:templates,
      forms:forms, 
      filter:"item"
    }
  )
});

router.put('/:companyId', function(req,res){
  utils.handler(req,res,actions.update,"company", 
    {
      metadata:metadata,
      templates:templates,
      forms:forms, 
      filter:"item"
    }
  )
});

router.delete('/:companyId', function(req,res){
  utils.handler(req,res,actions.remove,"company", 
    {
      metadata:metadata,
      templates:templates,
      forms:forms, 
      filter:"list"
    }
  )
});

router.patch('/status/:companyId', function(req,res){
  utils.handler(req,res,actions.status,"company", 
    {
      metadata:metadata,
      templates:templates,
      forms:forms, 
      filter:"item"
    }
  )
});

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

// publish the capability routes
module.exports = router
