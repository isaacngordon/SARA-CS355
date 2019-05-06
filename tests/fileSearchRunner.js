
function search(doc, query){

};

//takes a JSONArray of JSON objects and parses it out into HTML elements for the Search-Results div
function injectResults(ary){
    var n = ary.length;
    for (var i = 0; i < n; i++){
        var x = ary[i];
        var title = x.title;
        var u = x.url;
        var descrip = x.description;

        var searchResults = document.getElementById("search-results");
        var searchNode = document.createElement("section");
        searchNode.className = "normal-section search-result";
        
        var header = document.createElement("h2");
        header.innerHTML = title;

        var anchor = document.createElement("a");
        anchor.className = "search-url";
        anchor.href = u;
        anchor.innerHTML = u;

        var d = document.createElement("p");
        d.innerHTML = descrip;
        
        searchNode.appendChild(header);
        searchNode.appendChild(anchor);
        searchNode.appendChild(d);

        searchResults.appendChild(searchNode);
    }//for
};