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

router.get('/', routes.home)
router.post('/', routes.create);
router.get('/list/', routes.list);
router.get('/filter/', routes.filter);
router.get('/:companyId', routes.read);
router.put('/:companyId', routes.update);
router.delete('/:companyId', routes.remove);
router.patch('/status/:companyId', routes.status);

module.exports = router

