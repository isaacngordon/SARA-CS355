var genesis = "";
$(document).ready(function(err){

    var x = document.getElementById("menuHere");
    genesis = getLocalPathSuffix();
    var menu = generateMenu(genesis);
    console.log("Menu loaded: \n");
    //console.log(menu);
    x.innerHTML = menu;
    console.log("path is ",window.location.pathname);
    console.log("path is ",window.location);
    console.log("window is ",window);
});

function getLocalPathSuffix(){
    let scripts = document.getElementsByTagName("script");
    let myPath = scripts[scripts.length - 1].src;
    let indexBeforeMe = myPath.lastIndexOf("/");
    let g = myPath.substring(0,indexBeforeMe);
    return g;
}

function generateMenu(suffix){
    let str = `<nav class="menu">
    <ul id="nav-ul">
        </li>
        <li id="burger-list-item">
            <div id="hamburger" onclick="burgerFunction();responsiveMenu()">
                <div class="burger-bar" id="bar-1"></div>
                <div class="burger-bar" id="bar-2"></div>
                <div class="burger-bar" id="bar-3"></div>
            </div>
        </li>
        <li>
        <a href="${suffix}/index.html">Home</a>
        </li>
        <li class="dropdown">
            <a class="dropbtn" href="${suffix}/course.html">Course</a>
            <div class="dropdown-content">
                <a target="_blank" href="https://learn.zybooks.com/zybook/CUNYCSCI355TeitelmanSpring2019">Zybook</a>
            </div>
        </li>
        <li class="dropdown">
            <a class="dropbtn"  href="${suffix}/search.html">Search</a>
            <div class="dropdown-content">
                <a href="${suffix}/search-resources/dummy-search.html">Dummy Search</a>
                <a href="${suffix}/search-resources/file-search.html">File Search</a>
                <a href="${suffix}/search-resources/google-search.html">Google API Search</a>
                <a href="${suffix}/search-resources/real-search.html">The Real Deal Search</a>
            </div>
        </li>  
        <li>
            <a href="${suffix}/browser.html">Browser</a>
        </li>
        <li class="dropdown">
            <a class="dropbtn" href="${suffix}/about.html">About</a>
            <div class="dropdown-content">
            <!--    <a href="${suffix}/about-resources/isaac-gordon.html">Isaac Gordon</a>
                <a href="${suffix}/about-resources/ron-refael.html">Ron Refael</a> 
            -->    
                <a href="${suffix}/about-resources/contact-us.html">Contact Us</a>
            </div>
    </ul>
</nav>`;

    return str;
}

