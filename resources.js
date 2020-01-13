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
router.use(bodyParser.json({type:representation.responseTypes}));
router.use(bodyParser.urlencoded({extended:representation.urlencoded}));

var templates = representation.templates;
var forms = transitions.forms;
var metadata = [
  {name: "title", value: "BigCo Company Records"},
  {name: "author", value: "Mike Amundsen"},
  {name: "release", value: "1.0.0"} 
];

// optional tracking middleware
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now() + " : " + req.headers.host + req.url)
  next()
})

// the exposed resources to manage state for this API
router.post('/', function(req,res){
  utils.handler(req,res,actions.create,"company", 
    {metadata:metadata,templates:templates,forms:forms}
  )
});

router.get('/list/',function(req,res){
  utils.handler(req,res,actions.list,"company", 
    {metadata:metadata,templates:templates,forms:forms}
  )
});

router.get('/filter/', function(req,res){
  utils.handler(req,res,actions.filter,"company", 
    {metadata:metadata,templates:templates,forms:forms}
  )
});

router.get('/:companyId', function(req,res){
  utils.handler(req,res,actions.read,"company", 
    {metadata:metadata,templates:templates,forms:forms}
  )
});

router.put('/:companyId', function(req,res){
  utils.handler(req,res,actions.update,"company", 
    {metadata:metadata,templates:templates,forms:forms}
  )
});

router.delete('/:companyId', function(req,res){
  utils.handler(req,res,actions.remove,"company", 
    {metadata:metadata,templates:templates,forms:forms}
  )
});

router.patch('/status/:companyId', function(req,res){
  utils.handler(req,res,actions.status,"company", 
    {metadata:metadata,templates:templates,forms:forms}
  )
});

router.get('/',function(req,res){
  utils.handler(req,res,actions.home,"home", 
    {metadata:metadata,templates:templates,forms:forms}
  )
});

// publish the capability routes
module.exports = router


