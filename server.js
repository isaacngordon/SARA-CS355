var express = require("express");
var app = express();

//set port
var port = process.env.PORT || 8080

//allows html, images, css, etc other static files to run within this dirname variable
//which evaluates to the path of the files
app.use(express.static(__dirname + "/public"));

//routes
//which url and url motifications lead you to where?
app.get("/", function(req, res){
    res.render("index");
})

//set server listener to port
app.listen(port, function(){
    console.log("App listening on port " + port);
})
