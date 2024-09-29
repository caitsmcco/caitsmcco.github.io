var as1 = document.getElementById("as1");
var as2 = document.getElementById("as2");
var as3 = document.getElementById("as3");
var as4 = document.getElementById("as4");

var as1block = document.getElementById("as1block");
var as1dis = document.getElementById("as1dis");
var as1con = document.getElementById("as1con");
var as1ref = document.getElementById("as1ref");
var as1final = document.getElementById("as1final");

var as2block = document.getElementById("as2block")

function as1Set(element){
    as1dis.style.display="none";
    as1con.style.display="none";
    as1ref.style.display="none";
    as1final.style.display="none";
    document.getElementById(element).style.display="inline-block";
}

function displayA(asbutton, asblock){
    as1.removeAttribute("disabled");
    as2.removeAttribute("disabled");
    as3.removeAttribute("disabled");
    as4.removeAttribute("disabled");
    asbutton.setAttribute("disabled","disabled");
    as1block.style.display = "none";
    as2block.style.display = "none";
    asblock.style.display = "block";
}
