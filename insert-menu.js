$(document).ready(function(err){

    var x = document.getElementById("menuHere");
    var menu = generateMenu();
    console.warn("Menu loaded: \n");
    console.log(menu);
    x.innerHTML = menu;
});

function generateMenu(){
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
        <a href="/Users/isaacgordon/Documents/Academics/CSCI/CSCI_355_Teitelman/project-files/SARA-CS355/index.html">Home</a>
        </li>
        <li class="dropdown">
            <a class="dropbtn" href="/Users/isaacgordon/Documents/Academics/CSCI/CSCI_355_Teitelman/project-files/SARA-CS355/course.html">Course</a>
            <div class="dropdown-content">
                <a target="_blank" href="https://learn.zybooks.com/zybook/CUNYCSCI355TeitelmanSpring2019">Zybook</a>
            </div>
        </li>
        <li class="dropdown">
            <a class="dropbtn"  href="/Users/isaacgordon/Documents/Academics/CSCI/CSCI_355_Teitelman/project-files/SARA-CS355/search.html">Search</a>
            <div class="dropdown-content">
                <a href="/Users/isaacgordon/Documents/Academics/CSCI/CSCI_355_Teitelman/project-files/SARA-CS355/search-resources/dummy-search.html">Dummy Search</a>
                <a href="/Users/isaacgordon/Documents/Academics/CSCI/CSCI_355_Teitelman/project-files/SARA-CS355/search-resources/file-search.html">File Search</a>
                <a href="#">Google API Search</a>
                <a href="#">The Real Deal Search</a>
            </div>
        </li>  
        <li class="dropdown">
            <a class="dropbtn" href="/Users/isaacgordon/Documents/Academics/CSCI/CSCI_355_Teitelman/project-files/SARA-CS355/browser.html">Browser</a>
            <div class="dropdown-content">
                <a href="/Users/isaacgordon/Documents/Academics/CSCI/CSCI_355_Teitelman/project-files/SARA-CS355/browser.html/#browser-info">Browser Info</a>
                <a href="/Users/isaacgordon/Documents/Academics/CSCI/CSCI_355_Teitelman/project-files/SARA-CS355/browser.html/#window-info">Window Info</a>
                <a href="/Users/isaacgordon/Documents/Academics/CSCI/CSCI_355_Teitelman/project-files/SARA-CS355/browser.html/#screen-info">Screen Info</a>
                <a href="/Users/isaacgordon/Documents/Academics/CSCI/CSCI_355_Teitelman/project-files/SARA-CS355/browser.html/#location-info">Location Info</a> 
                <a href="/Users/isaacgordon/Documents/Academics/CSCI/CSCI_355_Teitelman/project-files/SARA-CS355/browser.html/#geolocation-info">GeoLocation Info</a> 
            </div>
        </li>
        <li class="dropdown">
            <a class="dropbtn" href="/Users/isaacgordon/Documents/Academics/CSCI/CSCI_355_Teitelman/project-files/SARA-CS355/about.html">About</a>
            <div class="dropdown-content">
            <!--    <a href="/Users/isaacgordon/Documents/Academics/CSCI/CSCI_355_Teitelman/project-files/SARA-CS355/about-resources/isaac-gordon.html">Isaac Gordon</a>
                <a href="/Users/isaacgordon/Documents/Academics/CSCI/CSCI_355_Teitelman/project-files/SARA-CS355/about-resources/ron-refael.html">Ron Refael</a> 
            -->    
                <a href="/Users/isaacgordon/Documents/Academics/CSCI/CSCI_355_Teitelman/project-files/SARA-CS355/about-resources/contact-us.html">Contact Us</a>
            </div>
    </ul>
</nav>`;

    return str;
}

