var express = require('express');
var router = express.Router();
var crawler = require('./crawler');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

router.get('/search', function(req, res, next) {
  console.log("Incoming Query: ", req.query.q); 
  crawler.begin(req.query.q, (arr) => {
    res.status(200);
    res.setHeader('Content-type', 'text/xml');
    xmlResult = writeJSONArrayToXMLFile(arr);
    res.send(xmlResult);
  });
});

router.get('/login', function(req, res, next){
  res.sendFile(path.join(__dirname + '/login.html'));  
})

function writeJSONArrayToXMLFile(jsonAry){
  //create results string
  var resultsString = `<?xml version="1.0" encoding="UTF-8"?>\n<results>\n`;
  for(let i = 0; i < jsonAry.length; i++){
      resultsString += `  <result>\n    <title>` + jsonAry[i].title + `</title>\n`;
      resultsString += `    <url>` + jsonAry[i].url + `</url>\n`;
      resultsString += `    <description>` + jsonAry[i].description + `</description>\n  </result>\n`;
  }
  resultsString += `</results>`;
  
  return resultsString;
}

module.exports = router;
