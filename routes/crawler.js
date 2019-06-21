var db = require('monk')('heroku_gv5w78ls:$sSGNezL2RUC6S!qSh74J27Ku9NUSwDahtC@ds157956.mlab.com:57956/heroku_gv5w78ls')

function begin(query){
    console.log("Query Recieved:", query);

    //look for a matching past query in the db
    //start new crawl and obtain json array of results
    //turn json array into XML string
        //store what needs to be stored
    // return xml string
    return `<results><result><title>Query: ${query}</title><url>https://www.google.com</url><description>You already know</description></result></results>`

}

module.exports = {
    begin: begin
}