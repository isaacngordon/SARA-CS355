<?php
    echo '
    <nav class="menu">
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
        <a href="index.html">Home</a>
        </li>
        <li class="dropdown">
            <a class="dropbtn" href="course.html">Course</a>
            <div class="dropdown-content">
                <a target="_blank" href="https://learn.zybooks.com/zybook/CUNYCSCI355TeitelmanSpring2019">Zybook</a>
            </div>
        </li>
        <li class="dropdown">
            <a class="dropbtn"  href="search.html">Search</a>
            <div class="dropdown-content">
                <a href="search-resources/dummy-search.html">Dummy Search</a>
                <a href="#">File Search</a>
                <a href="#">Google API Search</a>
                <a href="#">The Real Deal Search</a>
            </div>
        </li>  
        <li class="dropdown">
            <a class="dropbtn" href="browser.html">Browser</a>
            <div class="dropdown-content">
                <a href="browser.html/#browser-info">Browser Info</a>
                <a href="browser.html/#window-info">Window Info</a>
                <a href="browser.html/#screen-info">Screen Info</a>
                <a href="browser.html/#location-info">Location Info</a> 
            </div>
        </li>
        <li class="dropdown">
            <a class="dropbtn" href="about.html">About</a>
            <div class="dropdown-content">
                <a href="about-resources/isaac-gordon.html">Isaac Gordon</a>
                <a href="about-resources/ron-refael.html">Ron Refael</a> 
                <a href="about-resources/contact-us.html">Contact Us</a>
            </div>
    </ul>
</nav> ' 

?>