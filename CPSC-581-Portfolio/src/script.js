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
var as2dis = document.getElementById("as2dis");
var as2con = document.getElementById("as2con");
var as2ref = document.getElementById("as2ref");
var as2final = document.getElementById("as2final");

var as3block = document.getElementById("as3block")
var as3dis = document.getElementById("as3dis");
var as3con = document.getElementById("as3con");
var as3ref = document.getElementById("as3ref");
var as3final = document.getElementById("as3final");


var as4block = document.getElementById("as4block")

function as1Set(element){
    as1dis.style.display="none";
    as1con.style.display="none";
    as1ref.style.display="none";
    as1final.style.display="none";
    document.getElementById(element).style.display="inline-block";
}

function as2Set(element){
    as2dis.style.display="none";
    as2con.style.display="none";
    as2ref.style.display="none";
    as2final.style.display="none";
    document.getElementById(element).style.display="inline-block";
}

function as3Set(element){
    as3dis.style.display="none";
    as3con.style.display="none";
    as3ref.style.display="none";
    as3final.style.display="none";
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
    as4block.style.display = "none";
    asblock.style.display = "block";
}
