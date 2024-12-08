const data = {
    "1": {
        "title":"Kaylee's Love Guesser"
        ,"author":"Group 15"
        ,"scheme":"#95b8d1"
    }
    ,"2": {
        "title":"Green Thumb Unlock"
        ,"author":"Group 16"
        ,"scheme":"#b8e0d4"
    }
    ,"3": {
        "title":"Breakfast Now!"
        ,"author":"Caitlin McConnery"
        ,"scheme":"#d6eadf"
    }
    ,"4": {
        "title":"Jack's Snacks"
        ,"author":"Group 15"
        ,"scheme":"#eac4d5"
    }
    ,"5": {
        "title":"Sketchbook"
        ,"author":"Caitlin McConnery"
        ,"scheme":"#f5e2ea"
    }
};

function loadContent(obj)   {
    var top = document.getElementById("selected");
    var box = document.getElementById("s_content");
    var navbar = document.getElementById("navbar");
    var title = document.getElementById('s_title');
    var author = document.getElementById('s_author');
    
    var selectedItem = data[obj];
    title.innerHTML = selectedItem["title"];
    author.innerHTML = selectedItem["author"];
    navbar.style.backgroundColor = selectedItem["scheme"];
    box.style.backgroundColor = selectedItem["scheme"];
    top.style.backgroundColor = selectedItem["scheme"];
    loadInfo("a","b1");
};

async function loadInfo(obj,type){
    var buttons = document.getElementById("s_options").children;
    for (var i = 0; i < buttons.length; i++){
        buttons[i].style.backgroundColor = "#00000000";
    }
    document.getElementById(type).style.backgroundColor = "rgb(254, 255, 236, 0.4)";
    var ref = await fetch("ab1.html");
    var html = await ref.text();
    document.getElementById('s_body').insertAdjacentHTML("beforeend", html);
};


text = r"