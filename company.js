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

// home
router.get('/', function (req, res) {
  res.send('{"body" : "home"}\n');
})

// create
router.post('/', function(req,res) {
  res.send('{"body" : ' + JSON.stringify(req.body,null,2) + '}\n');
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
