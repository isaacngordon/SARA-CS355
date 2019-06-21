var express = require('express');
var router = express.Router();
var url = require('url');
var fs = require('fs');
var crawler = require('./crawler');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

router.get('/search', function(req, res, next) {
  console.log("Incoming Query: ", req.query.q); 
  var xmlResult = crawler.begin(req.query.q);
  var f = '<?xml version="1.0" encoding="UTF-8"?>\n' + xmlResult;
  res.status(200);
  res.setHeader('Content-type', 'text/xml');
  res.send(f);
});

router.get('/login', function(req, res, next){
  res.sendFile(path.join(__dirname + '/login.html'));  
})

router.get('/HelloWorld', function(req, res) {
  var name = req.param('name') || 'Somebody';
  var respondWith = '<?xml version="1.0" encoding="UTF-8"?>';
  respondWith += "<h1>Hello " + name + "!</h1>";
  res.status(200);
  res.setHeader('Content-type', 'text/xml');
  return res.send(respondWith);
});


module.exports = router;
