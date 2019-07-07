//db path: 'mongodb://cs355:dcm&$PeSBEv5t5IdNRzbkzKCZK3ZB&^40Mk@ds157956.mlab.com:57956/heroku_gv5w78ls'
//cs355 pass: dcm&$PeSBEv5t5IdNRzbkzKCZK3ZB&^40Mk
//const monk = require('monk')
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const mLabURI = "mongodb://heroku_gv5w78ls:59j67ed88v7khav67sk8dftmh5@ds157956.mlab.com:57956/heroku_gv5w78ls";
const localURI = "";
const client = new MongoClient(mLabURI, { useNewUrlParser: true});

function begin(query, callback){
    console.log("Query Recieved:", query);

    var array = [];
    try{
        client.connect(function(err, conn){
            assert.equal(null, err);
            var db = conn.db("heroku_gv5w78ls")
            var collection = db.collection("qurls")
            var cursor = collection.find();
            console.log(">>> cursor loaded");
            //console.log("Connected successfully to server");
            // perform actions on the collection object
            var c = 0;
            cursor.forEach(function(doc, err){
                if(err){
                    console.error("ERROR", err)
                }else{
                    c++;
                    let obj = {};
                    obj.title = doc.title;
                    obj.url = doc.url;
                    obj.description = doc.description;
                    console.log(">>>FOREACH: ", "count= " + c , 'object= ' + JSON.stringify(obj));
                    array.push(obj);
                }
            }, function() {
                console.log(">>>SUCCESS: ", "DB access successful. Entering callback function....\n ")
                callback(array);
                conn.close(false);
            });
        });//cleant.connect
    }   
     catch(err){
        console.error("ERROR: ", err );
        array.push({title: "There was an error completeing your search.",
                    url: 'n/a',
                    description: 'SERVER GENERATED ERROR',
                    count: 5});
        callback(array);
    }

}//begin

function checkConnection(callback){
    if(client.isConnected){
        callback(error, client);
    } else {
        client = new MongoClient(mLabURI, { useNewUrlParser: true}); 
        client.connect(callback);
    }
}


module.exports = {
    begin: begin
}