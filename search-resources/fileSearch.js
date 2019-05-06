var results = [];
var fileUploaded = false;

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
            /*
            var data = null;
            var file = evt.target.files[0];
            var reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function(event) {
                var dataAsText = event.target.result;
                data = $.csv.toArrays(dataAsText);
                if (data && data.length > 0) {
                    //alert('Imported file with ' + data.length + ' rows successfully!');
                    alert('Imported file is: ' + dataAsText);
                    return dataAsText;
                } else {
                    alert('No data available to import!');
                }
            };
            reader.onerror = function() {
                alert('Unable to read ' + file.fileName);
            };
            */
            console.log(evt.FileList)
        }
    }, false);

    
});

function injectResults(ary){
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

function uploadFile(inputFile){
    

}

function downloadResults(evt){
    
}