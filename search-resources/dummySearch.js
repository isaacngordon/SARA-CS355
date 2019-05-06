var results = [
    {"title":"Best Pizza in NYC: Places With the Best Slices in New York City - Thrillist", "url":"https://www.thrillist.com/eat/new-york/the-best-pizza-in-new-york-city", "description":"Aug 31, 2018 - As listicles, outcry over our mayor's pizza-eating method, and any New York transplant in LA, Detroit, or Chicago will tell you, we're tethered to ..."},
    {"title":"The 20 Best Pizza Places In NYC - New York - The Infatuation", "url":"https://www.theinfatuation.com/new-york/guides/best-pizza-nyc", "description":"New York City needs pizza the same way a plant needs sunlight or a subway needs a conductor. In other words, it's important - and that's why we spent several ..."},
    {"title":"Best Pizza Restaurants in New York City : Food Network ... - NYC", "url":"https://www.foodnetwork.com > Restaurants", "description":"The Best Pizza in New York City. Keste. Paulie Gee's. Totonno's Pizzeria Napolitano. Ops. Joe's Pizza. Houdini Kitchen Lab. John's of Bleecker Street. Prince Street Pizza."},
    {"title":"New York pizza - NYC - Time Out", "url":"https://www.timeout.com/newyork/restaurants/best-new-york-pizza", "description":"Nov 7, 2018 - Craving a New York pizza slice? We ranked pies from all 5 boroughs to crown the best pizza in NYC, with family-owned joints and new-age ..."},
    {"title":"THE 10 BEST Pizza Places in New York City - TripAdvisor - NYC", "url":"https://www.tripadvisor.com > United States > New York (NY) > New York City", "description":"Best Pizza in New York City, New York: Find TripAdvisor traveler reviews of New York City Pizza places and search by price, location, and more."},
    {"title":"Best pizza in New York City: Where to go and what they serve | CNN ...", "url":"https://www.cnn.com/travel/article/best-pizza-new-york-city/index.html", "description":"New York City's pizza scene is stronger than ever. Find out where to go for the best pizza restaurants and ..."},
    {"title":"New York City's 25 Most Iconic Pizzerias - Eater NY", "url":"https://ny.eater.com/maps/nyc-best-iconic-pizza-pizzeria", "description":"Sep 24, 2018 - Legendary pizzaiolo Dom DeMarco has been serving up what some consider to be New York City's best pizza since 1965. Even today, it's not ..."},
    {"title":"Best Pizza in N.Y.C.: Try These 10 Slices - The New York Times", "url":"https://www.nytimes.com/2018/11/15/nyregion/best-pizza-slices-nyc.html", "description":"Nov 15, 2018 - Pete Wells, The New York Times's restaurant critic since 2012, eats hundreds and hundreds of meals every year, searching for the best food ..."},
    {"title":"New York's 10 Best Pizza Joints - Forbes", "url":"https://www.forbes.com/sites/garystoller/2018/10/09/new-yorks-10-best-pizza-joints/", "description":"Oct 9, 2018 - New York once boasted it had the world's best pizza. Times may have changed, but there still are plenty of places to devour a divine slice."},
    {"title":"Best Pizza - Brooklyn", "url":"www.best.piz.za.com/", "description":"Located in Williamsburg, Brooklyn in a former bakery, Best Pizza utilizes a ... Sicilian heritage, and New York City pizzeria tradition, Pinello is dedicated to bring ..."}
]

$(document).ready(function(err){
    var x = document.getElementById("btnSearch");
    x.addEventListener("click", function(){
        injectResults();
    });

    x = document.getElementById("txtFileUpload");
    x.addEventListener("click", function(){
        window.alert("This is a dummy search page. No uploads will processed.")
    });

    x = document.getElementById("btnDownload");
    x.addEventListener("click", function(){
        window.alert("This is a dummy search page. No downloads will be processed.")
    });
});

function injectResults(){
    for(var i = 0; i < results.length; i++){
        var obj = results[i];
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