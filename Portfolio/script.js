const data = {
    "1": {
        "title":"Kaylee's Love Guesser"
        ,"author":"Group 15"
        ,"scheme":"#95b8d1"
        ,"code":"https://github.com/kayleenasser/CPSC-581-Project-1"
    }
    ,"2": {
        "title":"Green Thumb Unlock"
        ,"author":"Group 16"
        ,"scheme":"#b8e0d4"
        ,"code":"https://glitch.com/edit/#!/green-thumb-unlock"
    }
    ,"3": {
        "title":"Breakfast Now!"
        ,"author":"Caitlin McConnery"
        ,"scheme":"#d6eadf"
        ,"code":"https://glitch.com/edit/#!/breakfast-now"
    }
    ,"4": {
        "title":"Jack's Snacks"
        ,"author":"Group 15"
        ,"scheme":"#eac4d5"
        ,"code":"https://github.com/caitsmcco/jacks-snacks"
    }
    ,"5": {
        "title":"Sketchbook"
        ,"author":"Caitlin McConnery"
        ,"scheme":"#f5e2ea"
    }
};

var thisItem = data[1];
var selected = 1;

function loadContent(obj)   {
    var top = document.getElementById("selected");
    var box = document.getElementById("s_content");
    var navbar = document.getElementById("navbar");
    var title = document.getElementById('s_title');
    var author = document.getElementById('s_author');
    thisItem = data[obj];
    selected = obj;
    var selectedItem = data[obj];
    title.innerHTML = selectedItem["title"];
    author.innerHTML = selectedItem["author"];
    navbar.style.backgroundColor = selectedItem["scheme"];
    box.style.backgroundColor = selectedItem["scheme"];
    top.style.backgroundColor = selectedItem["scheme"];
    loadInfo("b1");
};

async function loadInfo(type){
    
    if (type == "b5"){
        window.open(thisItem["code"])
        return;
    }
    var buttons = document.getElementById("s_options").children;
    for (var i = 0; i < buttons.length; i++){
        buttons[i].style.backgroundColor = "#00000000";
    }
    if (selected == 5){
        document.getElementById("s_options").style.display = "none";
        filename = "sketchbook.html"
        console.log(filename);
        var ref = await fetch(filename);
        var html = await ref.text();
        element.innerHTML = "";
        document.getElementById('s_body').insertAdjacentHTML("beforeend", html);
        return;
    } else {
        document.getElementById("s_options").style.display = "flex";
    }
    document.getElementById(type).style.backgroundColor = "rgb(254, 255, 236, 0.4)";
    element = document.getElementById("s_body");
    filename = selected + "/" + type + ".html";
    console.log(filename);
    var ref = await fetch(filename);
    var html = await ref.text();
    element.innerHTML = "";
    document.getElementById('s_body').insertAdjacentHTML("beforeend", html);
};