
var post = document.querySelector(".post"),
title = document.getElementById("title12"),
    star = document.querySelector(".star"),
   
    input= document.querySelector(".input1515"),
    message1 = document.querySelector(".contact-col2"),
 navlinks = document.getElementById("navlinks"),
 loading = document.getElementById("loading"),
    togglebtn = document.getElementById("botn"),
    loginfo = document.getElementById("login55"),
    signupfo = document.getElementById("signup55");

function showmenu() {
       navlinks.style.display="block";
    navlinks.style.right="0";
 
}
function closemenu() {
    navlinks.style.right="-200px";
    navlinks.style.display="none";
}



function rate() {
    post.style.display="block";
    title.style.display="none";
    star.style.display="none";
}

function message() {
   window.alert("Thank's For your message");
}

function regestertog() {
    togglebtn.style.right="0";
    togglebtn.style.left="auto";
    loginfo.style.left = "-410px";
    signupfo.style.left = "30px";
    
    
}
function logintog() {
    togglebtn.style.right="auto";
    togglebtn.style.left="0";
    loginfo.style.left = "30px";
    signupfo.style.left = "410px";
}

