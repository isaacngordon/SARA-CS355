var results = [];

$(document).ready(function(err){
    var x;
    var downloadOptions = ['JSON', 'XML','CSV'];
    //set download options
    x = document.getElementById("dropDownload")
    for(var k = 0; k < downloadOptions.length; k++){
        let optionElem = document.createElement("OPTION");
        optionElem.value = downloadOptions[k];
        optionElem.innerHTML = downloadOptions[k];
        if(k==0) optionElem.setAttribute("selected", "selected");
        x.appendChild(optionElem);			
    }

    //event listener for search request
    x = document.getElementById("btnSearch");
    x.addEventListener("click", function(){
        try{
            let tt = document.getElementById("search-terms");
            let query = tt.value; 
            console.log("QUERY: \"", query,"\"\n")
            queryRun(query);
        }  catch(err) {
            console.error("There was an error running the search", err);
            window.alert("There was an error running your search request. Please try again later.");
        }
    });

    //event listener for download request
    x = document.getElementById("btnDownload");
    x.addEventListener("click", function(evt){
        if(results.length > 0){
            downloadResults(evt);
        } 
        else {
            console.error("Download clicked, but results array is empty.");
            window.alert("There was an error creating your document. Please try again later.");
        }
    });

    //add event listener for Select All button
    x = document.getElementById("btnSelectAll");
    x.addEventListener("click", function(){
        let allInputs = document.querySelectorAll(".result-checkbox");
        if(x.innerHTML == "Select All"){
            for(var i = 0; i < allInputs.length; i++){
                allInputs[i].checked = true;
            }//for
            x.innerHTML = "Deselect All";
        } else {
            for(var i = 0; i < allInputs.length; i++){
                allInputs[i].checked = false;
            }//for
            x.innerHTML = "Select All";
        }
    })
    let allInputs = document.querySelectorAll(".result-checkbox");
    for(var i = 0; i < allInputs.length; i++){
        allInputs[i].checked = false;
    }//for
    x.innerHTML = "Select All";
    
});

function removeChildrenOf(elem){
    /*for(var i = 0; i < elem.childNodes.length; i++){
        elem.removeChild(elem.childNodes[i]);
    }*/
    while (elem.firstChild) {
        elem.removeChild(elem.firstChild);
    }
}

function injectResults(ary){
    var resultsDiv = document.getElementById("resultsDiv");
    
    //remove old results from page
    removeChildrenOf(resultsDiv);
    if(ary.length == 0){
        let mssg = "No results have been found...";
        var womp = document.createElement("section")
        womp.setAttribute("class", "normal-section search-result");
        var h = document.createElement("h2");
        h.innerHTML = mssg;
        womp.append(h);
        resultsDiv.appendChild(womp);
        return;
    }

    for(var i = 0; i < ary.length; i++){
        var obj = ary[i];
        var s = document.createElement("section");
        var h = document.createElement("h2");
        var a = document.createElement("a");
        var p = document.createElement("p");

        //set section
        s.setAttribute("class", "normal-section search-result");

        //set h2
        h.innerHTML = obj.title;
        h.setAttribute("class", "result-title")

        //set a
        a.setAttribute("class", "result-url");
        a.setAttribute("href", obj.url);
        a.innerHTML = obj.url;

        //set p
        p.innerHTML = obj.description
        p.setAttribute("class", "result-description");

        //set checkbox
        var check = document.createElement("input");
        check.setAttribute("type", "checkbox");
        check.setAttribute("name", "dbResults");
        let val = `result${i}`;
        check.setAttribute("value", val);
        check.setAttribute("name", val);
        check.setAttribute("class","result-checkbox")

        //append to document
        s.append(h);
        s.append(a);
        s.append(p);
        s.append(check);
        resultsDiv.appendChild(s);
    }
}


function downloadResults(evt){
    //download
    //init ary
    var ary = [];
    //get the checkbox input elements
    var q = document.querySelectorAll(".search-result");
    console.log("q= ", q);
    //add checked ones to ary
    for(var i = 0; i < q.length; i++){
        //get the input elem
        let theChildern = q[i].children;
        let ip = theChildern[3];
        console.log("q[i]= ", q[i]);
        console.log("ip: ", ip);
        //if checked
        if(ip.checked){
            //get the correct 
            let h2 = theChildern[0];
            let anchor = theChildern[1];
            let p = theChildern[2];
            
            let title = h2.innerHTML;
            let url = anchor.getAttribute("href");
            let description = p.innerHTML;

            let jobj = {"title":title, "url":url, "description":description};
            ary.push(jobj);
        }
    }//for
    console.log("ary of selects: ", ary);

    //get dropVal of dropdown menu
    var ddl = document.getElementById("dropDownload");
    var dropVal = ddl.value; 
    console.log("Dropdown value: ", dropVal);
    //switch on dropVal, converting ary to the correct document format 
    switch(dropVal){
        case 'XML':
            writeJSONArrayToXMLFile(ary);
            break;
        case 'CSV':
            writeJSONArrayToCSVFile(ary);
            break;
        case 'JSON':
            writeJSONArrayToJSONFile(ary);
            break;
    }
}

 /* ---------  Web Crawling  ------------ */
 
 //zC3BP4HmXBu0Hp!ajtYI4QXqD%#oeszvO7R
 
 function queryRun(queryString){
    const mongodb = require('mongodb');
    //const request = require('request');
    //const cheerio = require('cheerio');
    //const URL = require('url-parse');
    
    var db_uri = "mongodb://web355:zC3BP4HmXBu0Hp!ajtYI4QXqD%#oeszvO7R@ds157956.mlab.com:57956/heroku_gv5w78ls";
    /*
    Connect to DB
    see if query exists in DB
        if yes, return the queryID
        loadByQueryID(queryID, results)
            extract list of urlIDS from queryID

    else start crawler
        create new queryID for this query
        start at wikipedia with search encoded in url
        for each url, 
            get new urlID
            count occurances of query words, 
            set numTimesCLicked=0, 
            add url ID to list of IDs
            set urlList in this query = to list of all those urlIDS
        onFinish
            return query ID 
            loadByQueryID(queryID, results)
            orderResults(results)
                edit the function to order based on numTimesClicked first, then countOccurances         
    */

    //test db connection
    mongodb.MongoClient.connect(db_uri, function(err, client) {

        if(err) throw err;
      
        /*
         * Get the database from the client. Nothing is required to create a
         * new database, it is created automatically when we insert.
         */
      
        let db = client.db('heroku_gv5w78ls')
      
        /*
         * First we'll add a few songs. Nothing is required to create the
         * songs collection; it is created automatically when we insert.
         */
      
        let qurl_collection = db.collection('qurl');

        qurl_collection.find().sort({_id : 1}).toArray(function(err, docs){
            if(err) throw err;

            let cc = 0;
            docs.forEach(function (doc){
                cc++;
                console.log("Doc " + cc + ":", doc);
            });

            // Only close the connection when your app is terminating.
            client.close(function (err) {
                if(err) throw err;
              });
        });
      });

   /* 
    results = [];                               //clears global results array

    //
    for(let i = 0; i < 10; i++){
        let obj = {};
        obj.title = responseFromGoogle[i].title;   //queston marks bc idk what it will be called
        obj.url = responseFromGoogle[i].link;
        obj.description = responseFromGoogle[i].snippet;
        console.log("obj: " , obj);
        results.push(obj);
    }
   
   //(4)
   orderResults(results);
   */
}

function orderResults(queryString){
    //see if qwurystring is blank and show all results
    if(queryString == ""){
        injectResults(results);
        return;
    }

    //count references to query
    var q = queryString.split(" ");
    var array = [];
    //var array = results;
    //console.warn(array, results);
    for(var i = 0; i < results.length; i++){

        //counts number of occrances of re in str
        function countOccurances(str, re){
            try{
                console.warn("Working with string " +str + " using expr " + re);
                return str.match(re).length;
            } catch (err){
                console.error("Cannot count occurances of " + re +" in "+ str +"\n", err);
                return 0;
            }
        }

        var count = 0;
        var r = results[i];
        for(var j = 0; j < q.length; j++){
            var t = r.title;
            var u = r.url;
            var d = r.description;
            var regex = new RegExp(q[j],"gi");

            count += countOccurances(t, regex);
            count += countOccurances(u, regex);
            count += countOccurances(d, regex);
        }
        results[i].count = count;
        if(results[i].count > 0) array.push(results[i]);
    }
    orderByCount(array);
    injectResults(array);
    console.warn(array, results);
}

function orderByCount(jsonAry){
    //use a simple sorting algorithm to reorder the jsonAry by the value of the field "count"
    function byReverseCount(x,y){
      return -(parseInt(x.count) - parseInt(y.count));
    }
    jsonAry.sort(byReverseCount);
}
      
function parseJSONtoJSON(dataString){
    var objectsAry = [];
    let a = JSON.parse(dataString);
    let r = a.results;
    
    for(var i = 0; i < r.length; i++) {
        var jobject = r[i];
        objectsAry.push(jobject);
    }

    console.log("JSON File: ", objectsAry);
    return objectsAry;
}
      

function writeJSONArrayToXMLFile(jsonAry){
    //create results string
    var resultsString = `<?xml version="1.0" encoding="UTF-8"?>\n<results>\n`;
    for(let i = 0; i < jsonAry.length; i++){
        resultsString += `  <result>\n    <title>` + jsonAry[i].title + `</title>\n`;
        resultsString += `    <url>` + jsonAry[i].url + `</url>\n`;
        resultsString += `    <description>` + jsonAry[i].description + `</description>\n  </result>\n`;
    }
    resultsString += `</results>`;
    
    var dataStr = "data:text/xml;charset=utf-8," + encodeURIComponent(resultsString);
    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href",     dataStr     );
    dlAnchorElem.setAttribute("download", "search-results.xml");
    dlAnchorElem.click(); 
}

function writeJSONArrayToCSVFile(jsonAry){
    //create string for file
    var resultsString = "";
    for(let i = 0; i < jsonAry.length; i++){
        resultsString += `"` + jsonAry[i].title + `", `;
        resultsString += `"` + jsonAry[i].url + `", `;
        resultsString += `"` + jsonAry[i].description + `"\n`;
    }
    
    var dataStr = "data:text/csv;charset=utf-8," + encodeURIComponent(resultsString);
    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href",     dataStr     );
    dlAnchorElem.setAttribute("download", "search-results.csv");
    dlAnchorElem.click(); 
}

function writeJSONArrayToJSONFile(jsonAry){
    var resultsString = "{" + "\n" + "results:" + "\n" + JSON.stringify(jsonAry, null, 4) + "\n" + " }";
    var dataStr = "data:application/json;charset=utf-8," + encodeURIComponent(resultsString);
    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href",     dataStr     );
    dlAnchorElem.setAttribute("download", "search-results.json");
    dlAnchorElem.click();      
}