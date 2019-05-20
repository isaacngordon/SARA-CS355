
$(document).ready(function(err){
    try{
        document.getElementById("hamburger").addEventListener("click", burgerFunction);
        document.getElementById("hamburger").addEventListener("click", responsiveMenu);
    } catch(err){
        console.log(err);
    }
})


function burgerFunction(){
    let hamburger = document.getElementById("hamburger");
    hamburger.classList.toggle("change");
}

function responsiveMenu(){
    var r = document.getElementById("nav-ul");
    r.classList.toggle("responsive");
}