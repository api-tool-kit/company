var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser');
var component = require('./simple-component');

// set up request body parsing
router.use(bodyParser.json({type:[
    "application/json",
    "application/vnd.hal+json",
    "application/vnd.siren+json",
    "application/vnd.collection+json"
    ]}));
router.use(bodyParser.urlencoded({extended:true}));

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

// config customer object
var props = ['id','name','email','status'];
var reqd = ['email'];

/***************************************
 * handle request events
 ***************************************/
// home
router.get('/', function (req, res) {
  res.send('{"body" : "home"}\n');
})

// create
router.post('/', function(req,res) {
  processPost(req,res).then(function(body) {
    res.send('{"body" : ' + JSON.stringify(body,null,2) + '}\n');
  }).catch(function(err) {
    res.send('{"error" : ' + JSON.stringify(err,null,2) + '}\n');
  });
});

// list
router.get('/list/', function(req, res) {
  processList(req,res).then(function(body) {
    res.send('{"list":' + JSON.stringify(body,null,2) + '}\n');
  }).catch(function(err) {
    res.send('{"error" : ' + JSON.stringify(err,null,2) + '}\n');
  });
});

// filter
router.get('/filter/', function(req, res) {
  res.send('{"filter": []}\n');
});

// read
router.get('/:companyId', function(req, res) {
  res.send('{"companyId" : "'+ req.params.companyId + '"}\n');
});

// update
router.put('/:companyId', function(req, res) {
  res.send('{"body" : ' + JSON.stringify(req.body,null,2) + '}\n');
});

// delete
router.delete('/:companyId', function(req, res) {
  res.send('{"list": []}\n');
});

module.exports = router

/****************************************
 * handle processing of request/responses
 ****************************************/

function processPost(req,res) {
  return new Promise(function(resolve,reject) {
    if(req.body) {
     var body = req.body;
     resolve(component({name:'customer',action:'add',item:body,props:props,reqd:reqd}));
    }
    else {
      reject({error:"invalid body"});
    }
  });
};

function processList(req,res) {
  return new Promise(function(resolve,reject) {
    resolve(component({name:'customer',action:'list'}));
  });
}

// generic promise example
function processRequest(req, res) {
  return new Promise(function(resolve,reject) {
    if(req.body) {
      var body = req.body;
      body.hatSize="12";
      resolve(body);
    }
    else {
      reject({error:"invalid body"});
    }
  });
}
