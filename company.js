/*****************************************
 * company service for BigCo, Inc.
 * 2019-01 mamund
 *****************************************/

var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser');
var routes = require('./routes');
var properties = require('./properties');

// set up body parsing
router.use(bodyParser.json({type:properties.responseTypes}));
router.use(bodyParser.urlencoded({extended:properties.urlencoded}));

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

//router.get('/', routes.home)
router.get('/',function(req,res){handler(req,res,routes.processHome,"company")});
router.post('/', routes.create);
//router.get('/list/',routes.list);
router.get('/list/',function(req, res){handler(req,res,routes.processList,"company")});
router.get('/filter/', routes.filter);
router.get('/:companyId', routes.read);
router.put('/:companyId', routes.update);
router.delete('/:companyId', routes.remove);
router.patch('/status/:companyId', routes.status);

module.exports = router


function handler(req, res, fn, type){
  fn(req,res).then(function(body) {
    if(body.type && body.type==='error') {
      body = {error:body};
    }  
    else  {
      body = {type:body};
    } 
    res.send(JSON.stringify(body,null,2));
  }).catch(function(err) {
    res.send('{"error" : ' + JSON.stringify(err,null,2) + '}\n');
  });
}

