var express = require('express')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

// define the home page route
router.get('/', function (req, res) {
  res.send('{"body" : "company home page"}')
})

router.get('/:companyId', function(req, res) {
  res.send('{"companyId" : req.params.companyId}');
});

module.exports = router
