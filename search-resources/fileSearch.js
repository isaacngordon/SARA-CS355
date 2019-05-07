var results = [];
var fileUploaded = false;
var fileData = "";

$(document).ready(function(err){

    //event listener for search request
    var x = document.getElementById("btnSearch");
    x.addEventListener("click", function(){
        if(results.length > 0){
            let query = null; //TODO: correct query refereence
            queryResults(query);
        } else if(!fileUploaded){
            window.alert("You must upload a file before you can search it.");
        }
        else {
            console.error("Search clicked, but results array is empty.");
            window.alert("There was an searching through your document. Please try again later.");
        }
    });

    //event listener for download request
    x = document.getElementById("btnDownload");
    x.addEventListener("click", function(evt){
        if(results.length > 0){
            downloadResults(evt);
        } else if(!fileUploaded){
            window.alert("You must upload a file before you can search it.");
        }
        else {
            console.error("Download clicked, but results array is empty.");
            window.alert("There was an error creating your document. Please try again later.");
        }
    });

    // The event listener for the file upload
    x = document.getElementById('txtFileUpload');
    x.addEventListener('change', function(e){
        
        // Method that checks that the browser supports the HTML5 File API
        function browserSupportFileUpload() {
            var isCompatible = false;
            if (window.File && window.FileReader && window.FileList && window.Blob) {
            isCompatible = true;
            }
            return isCompatible;
        }
        //read the selected file
        if (!browserSupportFileUpload()) {
            alert('The File APIs are not fully supported in this browser!');
        } else {
            console.log(x.files);
            const reader = new FileReader();
            reader.onload = function(){
                fileData = reader.result;
                console.log("FileData:\n","==========", fileData);
            }
            reader.readAsText(x.files[0]);
            
            fileUploaded = true;
        }
        var t = x.files[0].type;
        uploadFileData(fileData, t, results);
        injectResults(results);
        console.log("File upload success.");
    }, false); // 38

    
});

function injectResults(ary){
    //check if resultsDiv has results
    //if so clean it out
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

        //set a
        a.setAttribute("class", "search-url");
        a.setAttribute("href", obj.url);
        a.innerHTML = obj.url;

        //set p
        p.innerHTML = obj.description

        //set checkbox
        var check = document.createElement("input");
        check.setAttribute("type", "checkbox");
        check.setAttribute("name", "dbResults");
        let val = `result${i}`;
        check.setAttribute("value", val);
        check.setAttribute("name", val);

        //append to document
        s.append(h);
        s.append(a);
        s.append(p);
        s.append(check);
        var resultsDiv = document.getElementById("resultsDiv");
        resultsDiv.appendChild(s);
    }
}

function uploadFileData(inputString, ftype, ary){
    var jAry;
    if(ftype == "application/json"){
        jAry = parseJSONtoJSON(inputString);
        console.log("JSONARRAY taken at JSON to JSON",jAry);
    }else if(ftype == "text/csv"){
        jAry = parseCSVtoJSON(inputString);
        console.log("JSONARRAY taken at CSV to JSON ",jAry);
    }else if(ftype == "text/xml"){
        jAry = parseXMLtoJSON(inputString);
        console.log("JSONARRAY taken at XML to JSON ",jAry);
    }
    results = jAry;
}

function downloadResults(evt){
    
}

function queryResults(queryString){
    //see if qwurystring is blank and show all results
    if(queryString == ""){
        injectResults(results);
        return;
    }

    //count references to query
    var q = queryString.split(" ");
    var array = results;
    for(var i = 0; i < array.length; i++){
        var count = 0;
        var r = array[i];
        for(var j = 0; j < q.length; j++){
            var t = r.title;
            var u = r.url;
            var d = r.description;
            var regex = new RegExp(q[j],"gi");
            
            let tMatches = t.match(regex);
            let uMatches = u.match(regex);
            let dMatches = d.match(regex);
            let k;
            while (k = regex.exec(t)) {
                count += 2;
            }
            while (k = regex.exec(u)) {
                count += 3;
            }
            while (k = regex.exec(d)) {
                count += 1;
            }
        }
        array[i].count = count;
    }
    orderByCount(array);
    injectResults(array);
}

function orderByCount(jsonAry){
    //use a simple sorting algorithm to reorder the jsonAry by the value of the field "count"
    function byCount(x,y){
      return x.count - y.count;
    }
    jsonAry.sort(byCount);
}
      
function parseJSONtoJSON(dataString){
  //parse the dataString into an array of json objects
  //input each object into objectsAry[]
    //return objectsAry
     var objectsAry = [
        {"title":"Best Pizza Restaurants in New York City : Food Network ... - NYC", 
        "url":"https://www.foodnetwork.com > Restaurants", 
        "description":"The Best Pizza in New York City. Keste. Paulie Gee's. Totonno's Pizzeria Napolitano. Ops. Joe's Pizza. Houdini Kitchen Lab. John's of Bleecker Street. Prince Street Pizza."
    },
    {"title":"New York pizza - NYC - Time Out", 
        "url":"https://www.timeout.com/newyork/restaurants/best-new-york-pizza", 
        "description":"Nov 7, 2018 - Craving a New York pizza slice? We ranked pies from all 5 boroughs to crown the best pizza in NYC, with family-owned joints and new-age ..."
    },
     ];
    
    return objectsAry;
    
}
      
  function parseCSVtoJSON(dataString){
    //parse the dataString into an of json objects
  //input each object into objectsAry[]
    //return objectsAry
    
    var objectsAry = [
        {"title":"Best Pizza Restaurants in New York City : Food Network ... - NYC", 
        "url":"https://www.foodnetwork.com > Restaurants", 
        "description":"The Best Pizza in New York City. Keste. Paulie Gee's. Totonno's Pizzeria Napolitano. Ops. Joe's Pizza. Houdini Kitchen Lab. John's of Bleecker Street. Prince Street Pizza."
    },
    {"title":"New York pizza - NYC - Time Out", 
        "url":"https://www.timeout.com/newyork/restaurants/best-new-york-pizza", 
        "description":"Nov 7, 2018 - Craving a New York pizza slice? We ranked pies from all 5 boroughs to crown the best pizza in NYC, with family-owned joints and new-age ..."
    },
     ];
    
    return objectsAry;
  }
      
  function parseXMLtoJSON(dataString){
    //parse the dataString into an of json objects
      //input each object into objectAry[]
    //return objectsAry
    var objectsAry = [
        {"title":"Best Pizza Restaurants in New York City : Food Network ... - NYC", 
        "url":"https://www.foodnetwork.com > Restaurants", 
        "description":"The Best Pizza in New York City. Keste. Paulie Gee's. Totonno's Pizzeria Napolitano. Ops. Joe's Pizza. Houdini Kitchen Lab. John's of Bleecker Street. Prince Street Pizza."
    },
    {"title":"New York pizza - NYC - Time Out", 
        "url":"https://www.timeout.com/newyork/restaurants/best-new-york-pizza", 
        "description":"Nov 7, 2018 - Craving a New York pizza slice? We ranked pies from all 5 boroughs to crown the best pizza in NYC, with family-owned joints and new-age ..."
    },
     ];
    
    return objectsAry;
    
  }