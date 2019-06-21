//db path: 'mongodb://cs355:dcm&$PeSBEv5t5IdNRzbkzKCZK3ZB&^40Mk@ds157956.mlab.com:57956/heroku_gv5w78ls'
//cs355 pass: dcm&$PeSBEv5t5IdNRzbkzKCZK3ZB&^40Mk
//const monk = require('monk')
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const uri = "mongodb://heroku_gv5w78ls:59j67ed88v7khav67sk8dftmh5@ds157956.mlab.com:57956/heroku_gv5w78ls";
const client = new MongoClient(uri, { useNewUrlParser: true });

function begin(query, callback){
    console.log("Query Recieved:", query);

    function addResult(arr, result){
        arr.push(result);
    }

    try{
        var res = "";
        var array = [];
        client.connect(function(err){
            if(err){
                console.error("ERROR", err)
            }else{
                const collection = client.db("heroku_gv5w78ls").collection("qurls").find();
                console.log("Connected successfully to server");
                // perform actions on the collection object
                collection.forEach(function(doc, err){
                    if(err){
                        console.error("ERROR", err)
                    }else{
                        let obj = {};
                        obj.title = doc.title;
                        obj.url = doc.url;
                        obj.description = doc.description;
                        addResult(array, obj);
                    }
                }, function() {
                    callback(array);
                    client.close();
                });
            }//else
        });
    }   
     catch(err){
        console.error("ERROR: ", err );
    }

}//begin


module.exports = {
    begin: begin
}