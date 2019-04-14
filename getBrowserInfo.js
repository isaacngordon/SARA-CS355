
$(document).ready(function(err){
    try{
        browserInfo();
        windowInfo();
        screenInfo();
        locationInfo();
        geolocationInfo();
    } catch(err){
        console.log(err);
    }
})

/*Get Browser Info*/ 
function browserInfo(){
    var browserName = navigator.appName;
    var userAgent = navigator.userAgent;
    var browserVersion = navigator.appVersion;
    var browserPlatform = navigator.platform;

    var elementBrowserName = document.getElementById("browser-name");
    elementBrowserName.innerHTML = browserName;

    var elementBrowserVersion = document.getElementById("browser-version");
    elementBrowserVersion.innerHTML = browserVersion;

    var elementUserAgent = document.getElementById("browser-user-agent");
    elementUserAgent.innerHTML = userAgent;

    var elementBrowserPlatform = document.getElementById("browser-platform");
    elementBrowserPlatform.innerHTML = browserPlatform;
}

/* Get Window Info*/
function windowInfo(){
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;

    var elementWindowHeight = document.getElementById("window-height");
    elementWindowHeight.innerHTML = "Height: " + windowHeight + "px";

    var elementWindowWidth = document.getElementById("window-width");
    elementWindowWidth.innerHTML = "Width: " + windowWidth + "px";
}

/* Get Screen Info */
function screenInfo(){
    var width =  screen.width;
    var height = screen.height;
    var aWidth = screen.availWidth;
    var aHeight = screen.availHeight;
    var colorD = screen.colorDepth;
    var pixelD = screen.pixelDepth;

    var elementHeight = document.getElementById("screen-height");
    var elementWidth = document.getElementById("screen-width");
    var elementAHeight = document.getElementById("screen-avail-height");
    var elementAWidth = document.getElementById("screen-avail-width");
    var elementColor = document.getElementById("screen-color-depth");
    var elementPixel = document.getElementById("screen-pixel-depth");

    elementHeight.innerHTML = height + "px";
    elementWidth.innerHTML = width + "px";
    elementAHeight.innerHTML = aHeight + "px";
    elementAWidth.innerHTML = aWidth + "px";
    elementColor.innerHTML = colorD;
    elementPixel.innerHTML = pixelD;
}

/* Get Location Info */
function locationInfo(){
    var hr = window.location.href; 
    var hostname = window.location.hostname; 
    var pathname = window.location.pathname; 
    var protocol = window.location.protocol;

    var lhr = document.getElementById("location-href");
    lhr.innerHTML = hr;

    var lhost = document.getElementById("location-hostname");
    if(hostname == "") hostname = "Hostname is not availible";
    lhost.innerHTML = hostname;

    var lpath = document.getElementById("location-pathname");
    lpath.innerHTML = pathname;

    var lprotocol = document.getElementById("location-protocol");
    lprotocol.innerHTML = protocol;
}

/* Get Geolocation Info */
var elementLongitude = document.getElementById("geo-longitude");
var elementLatitude = document.getElementById("geo-latitude");
function geolocationInfo(){
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
      
        elementLatitude.innerHTML = "Geolocation is not supported by this browser.";
        elementLongitude.innerHTML = "Geolocation is not supported by this browser.";
      }
    
    
}

function showPosition(position) {
    elementLatitude.innerHTML = position.coords.latitude;
    elementLongitude.innerHTML = position.coords.longitude;
  }