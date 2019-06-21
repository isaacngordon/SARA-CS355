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

    //event listener for form submit
    x = document.getElementById("search-form");
    x.addEventListener("submit", function(){
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
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let dataXML = this.responseText;
            results = parseXMLtoJSON(dataXML);
            orderResults(queryString);
        }
    };
    xhttp.open("GET", "/search?q=" + encodeURIComponent(queryString), true);
    xhttp.send();
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

function parseXMLtoJSON(dataString){
    var objAry = [];
    
    //build relevent regexps
    let resultsTagExp = /<results>[\s\S]*?<\/results>/i;        //matches the <results> element
    let singleResultExp = /<result>[\s\S]*?<\/result>/ig;       //matches the <result> element
    let titleExp = /<title>[\s\S]*?<\/title>/i;                 //matches the <title> element
    let urlExp = /<url>[\s\S]*?<\/url>/i;                       //matches the <url> element
    let descripExp = /<description>[\s\S]*?<\/description>/i;   //matches the <description> element

    try{
        console.log("XML Parse on string:\n", dataString);
        let rs = dataString.match(resultsTagExp);
        console.log("Results Total String:\n", rs);
        let allResults = rs[0].match(singleResultExp);
        console.log('All Results:\n', allResults);
        
        //for each match of <result> tags, parse its contents and add it to the document
        for(let kk = 0; kk < allResults.length; kk++){
            let title, url, descrip;
            let aResult = allResults[kk];
            console.log('A result: ', aResult);
            
            //get properties
            title = aResult.match(titleExp)[0];
            url = aResult.match(urlExp)[0];
            descrip = aResult.match(descripExp)[0];

            //remove tags
            title = title.replace(/(<([^>]+)>)/ig,"");
            url = url.replace(/(<([^>]+)>)/ig,"");
            descrip = descrip.replace(/(<([^>]+)>)/ig,"");


            let o = {'title': title, 'url': url, 'description': descrip};
            objAry.push(o);
        }
        
        return objAry;
    } catch(err){
        console.error("Failed to Parse XML File", err, objAry);
    }
}//parseXMLtoJSON