/*TO DO:
- Need to add to the CSV and XML Validator functions(isXML & isCSV)
- Allow the xmlToJason to handle xml files with multiple elements
*/

//this method allows you to import files via jquery
$(document).ready(function() {

    // The event listener for the file upload
    document.getElementById('txtFileUpload').addEventListener('change', upload, false);

    // Method that checks that the browser supports the HTML5 File API
    function browserSupportFileUpload() {
        var isCompatible = false;
        if (window.File && window.FileReader && window.FileList && window.Blob) {
        isCompatible = true;
        }
        return isCompatible;
    }

    // Method that reads and processes the selected file
    function upload(evt) {
        if (!browserSupportFileUpload()) {
            window.alert('The File APIs are not fully supported in this browser!');
            } else {
                var data = null;
                var file = evt.target.files[0];
                var reader = new FileReader();
                reader.readAsText(file);
                reader.onload = function(event) {
                    var dataAsText = event.target.result;
                    data = $.csv.toArrays(dataAsText);
                    if (data && data.length > 0) {
                        //alert('Imported file with ' + data.length + ' rows successfully!');
                        window.alert('Imported file is: ' + dataAsText);
                        return dataAsText;
                    } else {
                        alert('No data available to import!');
                    }
                };
                reader.onerror = function() {
                    window.alert('Unable to read ' + file.fileName);
                };
            }
        }
});//source: https://cmatskas.com/importing-csv-files-using-jquery-and-html5/


var JSONArray =[];

//JSONInput
var inputObject ='{"title":"JSON","url":"json.org","description":"the home page for JavaScript Object Notation</description"}';

//XMLInput
var inputObject2 =   "<results>" +
                        "<result>" +
                            "<title>JSON</title>" +
                            "<url>json.org</url>" +
                            "<description>the home page for JavaScript Object Notation</description>" +
                        "</result>" +      
                     /*   
                        "<result>" +
                            "<title>XML</title>" +
                            "<url>xml.org</url>" +
                            "<description>the home page for Extensible Markup Language</description>" +
                        "</result>" +
                    */
                    "</results>";

//for some  reason isJSON only  returns true when only one result element iis in json object

//CSVInput
var inputObject3 = "JSON,json.org,the home page for JavaScript Object Notation";

document.getElementById("par1").innerHTML = ("The Initial Array Length is: " + JSONArray.length);


if(isJSON(inputObject)) {    
    //Since file is already in JSON format just add it to the array
    convertedJSONFile = jsonToJson(inputObject);
    JSONArray.push(convertedJSONFile);
    document.getElementById("JSON2JSON").innerHTML = ("The JSON File is: " + JSON.stringify(convertedJSONFile));
}if(isXML(inputObject2)){
    //parse the XML string into an XML object and then convert it to JSON
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(inputObject2,"text/xml");
    convertedXMLFile = xmlToJson(xmlDoc);
    JSONArray.push(convertedXMLFile);
    document.getElementById("XML2JSON").innerHTML = ("XML File Converted: " + convertedXMLFile);
}if(isCSV(inputObject3)){
    convertedCSVFile = csvToJson(inputObject3);
    JSONArray.push(convertedCSVFile);
    document.getElementById("CSV2JSON").innerHTML = ("The CSV File is: " + JSON.stringify(convertedCSVFile));
    //document.write("CSV File Converted: " + convertedCSVFile);
}else{
    //other wise tell user input is
    document.write("The inputted file is not a valid type.");
}

document.getElementById("par2").innerHTML =("The New Array Length is: " + JSONArray.length);

//prints out the elements in the array
for (i = 0; i < 3 ; i++){  
    document.write(JSON.stringify("Element number: " + i + " " + JSONArray.toString()));
}

//Functions that Validate the input file types:

// functions that checks if the inputString is JSON
function isJSON(inputString){
    try{
        JSON.parse(inputString);
    }catch (e) {
        return false;
    }
    return true;
}//isJSON

//functions that checks if the inputString is XML
function isXML(inputString){
    if(inputString.includes("<") || inputString.includes(">"))
        return true;
    else return false;
}//isXML


//functions that checks if the inputString is CSV
function isCSV(inputString){
    if((!(isJSON(inputString)) )) //need to add && inputObject.includes(",") so it differentiates from  XML
        return true;
}//isCSV

//functions that convert the inputString to  JSON:

//function that converts a JSON String into a JSON Object
function jsonToJson(JSONString){
    return JSON.parse(JSONString);
}//jsonToJson

//function that converts a CSV String into a JSON Object
function csvToJson(CSVString){
    var CSVElements = CSVString.split(",");
    //set an array that holds the appropriate headers for each element
    var headers = ["title", "url", "description"];
    var str = "{";
  
    for(var i = 0; i < CSVElements.length; i++){
        //Add each CSBelement as a JSON by using the format: "header":"element"
        str += ('"' + headers[i] + '"' + ":" + '"' + CSVElements[i] + '"');
        //if this is the end of the string add a clossing '}' instead of a ','
        if(i == CSVElements.length - 1){
            str += "}";
        }else{
        //otherwise seperate each element in the string with a ','
            str += ",";
        }
    }//for-loop
  //check if the CSV String was successfully converted to JSON  
  if(isJSON(str)){
                            //document.write("The cvs String is now a json String: " + str);
    //if Converted successfully return the JSON String
    return JSON.parse(str);
  }else{
      //otherwise throw an exception
      throw new Error('CSV not converted');
  }//try-catch

}//CSVToJson

//function that converts an XML object into a JSON Object
function xmlToJson(xmlDoc){
    var str = "{";
    // Pull out all of the titles elements
    var allTitles = xmlDoc.getElementsByTagName('title');
    var arrTitles = new Array();
    var titles = "Titles: ";
    // Pull out all of the url elements
    var allURLs = xmlDoc.getElementsByTagName('url');
    var arrURLs = new Array();
    var url = "URLs: ";
    // Pull out all of the descriptions elements
    var allDescriptions = xmlDoc.getElementsByTagName('description');
    var arrDescriptions = new Array();
    var descriptions = "Descriptions: ";
    
    //add elements to their appropriate arrays
    for (i = 0; i < allTitles.length; i++){ 
        arrTitles.push(allTitles[i].childNodes[0].nodeValue);
        titles = arrTitles[i];
      
        arrURLs.push(allURLs[i].childNodes[0].nodeValue);
        url = arrURLs[i];

        arrDescriptions.push(allDescriptions[i].childNodes[0].nodeValue);
        descriptions = arrDescriptions[i];
        
        str += ('"title":' + '"' + titles + '"' + ',"url":' + '"' + url + '"' + ',"description":' + '"' + descriptions + '"');
    }
    str += "}";         
   
    return str;
   
}//xmlToJson
