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
        if(results.length > 0){
            let tt = document.getElementById("search-terms");
            let query = tt.value; 
            console.log("QUERY: \"", query,"\"\n")
            queryGoogle(query);
        } 
        else {
            console.error("Search clicked, but results array is empty.");
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

    //add checked ones to ary
    for(var i = 0; i < q.length; q++){
        //get the input elem
        let ip = q[i].getElementsByClassName(".result-checkbox")[0];
        //if checked
        if(ip.checked){
            //get the correct 
            let h2 = q[i].getElementsByClassName(".result-title")[0];
            let anchor = q[i].getElementsByClassName(".result-url")[0];
            let p = q[i].getElementsByClassName(".result-description")[0];
            
            let title = h2.innerHTML;
            let url = anchor.getAttribute("href");
            let description = p.innerHTML;

            let jobj = {"title":title, "url":url, "description":description};
            ary.push(jobj);
        }
    }//for

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

function queryGoogle(queryString){
    

    /* 
    TAKING RESULTS AND DISPLAYING TO SCREEN
    1-call google api
    2-get results     //read docs and locate the 3 properties we care about; title, url, and description
    3-create correct JSON jocted and add to results[] 
    4- sort and inject results to page


    THe following assumes the Google APi responds with an array of JSON results
    Again, makes sure to read the docs, so you know how the response is formatted:
    */

    //(1) and (2)
    var responseFromGoogle = ... ;              //let this be an array of json objects from google
    results = [];                               //clears global results array

    //(3)
    for(let i = 0; i < responseFromGoogle.length; i++){
        let obj = {};
        obj.title = responseFromGoogle[i].?title? ;   //queston marks bc idk what it will be called
        obj.url = responseFromGoogle[i].?url? ;
        obj.description = responseFromGoogle[i].?descrip? ;
        
        results.push(obj);
    }
    
   //(4)
   orderResults(queryString);
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
      

//          -    ISAAC WILL DO BELOW     -         //

function writeJSONArrayToXMLFile(jsonAry){
    //name and open file
    //turn into a sring w line breaks after {, } , [, ], comma (all not in quotes), 
    //write string to file
    //close and download file
}

function writeJSONArrayToCSVFile(jsonAry){
    //name and open file
    //for each json obj in the ary
        //create a quoted comma deliminated string
        //add that string to the file followed by a line break
    //close and download file
}

function writeJSONArrayToJSONFile(jsonAry){
    //name and open file
    //write header\n to file
    //write <results>\n tag to file
    //for each obj in the ary
        //(concat into a string, with linebreaks after each tag)
        //append <result> tag to string
        //bind each property betwwen appropriate tags, and append to string
        //append </result> to string
        //write this string to the file
    //write </results> to the file
    //close and download file
        

}