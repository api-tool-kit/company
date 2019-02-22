var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser');

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
    res.send('{"body" : ' + JSON.stringify(err,null,2) + '}\n');
  });
});

// list
router.get('/list/', function(req, res) {
  res.send('{"list": []}\n');
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
     resolve(writeCustomer(body));
    }
    else {
      reject({error:"invalid body"});
    }
  });
};

function writeCustomer(body) {
  return new Promise(function(resolve,reject) {
    if(validCustomer(body)) {
      resolve(writeItem(body));
    }
    else {
      reject({error:"invalid Customer"});
    }
  });
}

function validCustomer(body) {
  return true;
}

function writeItem(body) {
  return new Promise(function(resolve,reject) {
    resolve(body);
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
