let mode = 'peggedPoints'
let round = 1
let play = {
    cc:'XX'
    ,d1:'XX'
    ,d2:'XX'
    ,p1a:'XX'
    ,p2a:'XX'
    ,p3a:'XX'
    ,p4a:'XX'
    ,p5a:'XX'
    ,p6a:'XX'
    ,p7a:'XX'
    ,p1b:'XX'
    ,p2b:'XX'
    ,p3b:'XX'
    ,p4b:'XX'
    ,p5b:'XX'
    ,p6b:'XX'
    ,p7b:'XX'
    ,handPointsa:0
    ,peggedPointsa:0
    ,handPointsa:0
    ,cribPointsa:0
    ,EORScorea:0
    ,handPointsb:0
    ,peggedPointsb:0
    ,handPointsb:0
    ,cribPointsb:0
    ,EORScoreb:0
};

const cardOrder1=['d1'
    ,'d2'
    ,'d3'
    ,'d4'
    ,'cc'
    ,'p1a'
    ,'p1b'
    ,'p2a'
    ,'p2b'
    ,'p3a'
    ,'p3b'
    ,'p4a'
    ,'p4b'
    ,'p5a'
    ,'p5b'
    ,'p6a'
    ,'p6b'
    ,'p7a'
    ,'p7b'
];
const cardOrder2=[
    'd1'
    ,'d2'
    ,'d3'
    ,'d4'
    ,'cc'
    ,'p1b'
    ,'p1a'
    ,'p2b'
    ,'p2a'
    ,'p3b'
    ,'p3a'
    ,'p4b'
    ,'p4a'
    ,'p5b'
    ,'p5a'
    ,'p6b'
    ,'p6a'
    ,'p7b'
    ,'p7a'
];

let games = []

let gameDate = new Date();

let game = {
    gameDate:gameDate
    , pNamea:"Player 1"
    , pNameb:"Player 2"
};

let rounds = [];

function newGame(){
    game.pNamea = document.getElementById('pNamea');
    game.pNameb = document.getElementById('pNameb');
    game.gameDate = gameDate;
};

function setMode(thisMode){
    document.getElementById(mode+'A').disabled = false;
    document.getElementById(mode+'B').disabled = false;
    mode = thisMode;
    document.getElementById(thisMode+'A').disabled = true;
    document.getElementById(thisMode+'B').disabled = true;
}

function add(player,amount){
    id = mode + player;
    play[id] = play[id] + amount;
    document.getElementById(id).innerHTML = play[id];
    if (play['EORScore' + player] == 119 && amount != 1){
        return;
    }
    play['EORScore' + player] = play['EORScore' + player] + amount;
    id = 'point' + player;
    document.getElementById(id).innerHTML = play['EORScore' + player];
}

function zero(player){
    id = mode + player;
    play['EORScore' + player] = play['EORScore' + player] - play[id];
    play[id] = 0;
    document.getElementById(id).innerHTML = play[id];
    id = 'point' + player;
    document.getElementById(id).innerHTML = play['EORScore' + player];
}

function newRound(){
    const thisPlayA = [game.pNamea,game.gameDate,round,play.d1,play.d2,play.cc,play.p1a,play.p2a,play.p3a,play.p4a,play.p5a,play.p6a,play.p7a,play.peggedPointsa,play.handPointsa,play.cribPointsa,play.EORScorea];
    rounds.push(thisPlayA);
    const thisPlayB = [game.pNameb,game.gameDate,round,play.d3,play.d4,play.cc,play.p1b,play.p2b,play.p3b,play.p4b,play.p5b,play.p6b,play.p7b,play.peggedPointsb,play.handPointsb,play.cribPointsb,play.EORScoreb];
    rounds.push(thisPlayB);
    round ++;
    console.log(rounds)
    resetPlay()
};

function resetPlay(){
    keys = Object.keys(play);
    for (i in keys){
        if (i ==24 || i == 20){
            continue;
        }
        play[keys[i]] = null;
    }
    buttons = document.getElementsByClassName('button_deck');
    for (i in buttons){
        buttons[i].disabled = false;
    }
    buttons = document.getElementsByName('played');
    console.log(buttons);
    for (i in buttons){
        buttons[i].disabled = true;
        buttons[i].innerHTML = buttons[i].id;
    }
    buttons = document.getElementsByName('pointlable');
    for (i in buttons){
        buttons[i].innerHTML = '0';
    }
    i = next.length;
    while (i >= 0){
        next.shift();
        i --;
    }
    if (round % 2 == 0){
        i = cardOrder2.length;
        while (i >= 0){
            next[i] = cardOrder2[i];
            i --;
        }
    }
    else {
       next = ['d1'
            ,'d2'
            ,'d3'
            ,'d4'
            ,'cc'
            ,'p1a'
            ,'p1b'
            ,'p2a'
            ,'p2b'
            ,'p3a'
            ,'p3b'
            ,'p4a'
            ,'p4b'
            ,'p5a'
            ,'p5b'
            ,'p6a'
            ,'p6b'
            ,'p7a'
            ,'p7b'
        ];
    }
    runningTotal = 0;
    document.getElementById('runningTotal').innerHTML = 0;
};

function endGame(){
    newRound();
    console.log(game);
    games.push(game);
    game.gameDate = new Date();
};

function enterName(){
    game.pNamea = document.getElementById("pNamea").value.trim();
    game.pNameb = document.getElementById("pNameb").value.trim();
    element = document.getElementById("nameEntry");
    element.style.display = 'none';
    document.getElementById('roundCards').style.display = 'block';
    document.getElementById("playeraName").innerHTML = game.pNamea;
    document.getElementById("playerbName").innerHTML = game.pNameb;
}
let runningTotal = 0
let next = cardOrder1;
function addCard(card){
    id = next.shift();
    if (!('d1d2d3d4cc'.includes(id))){
        num = cardElem.name;
        runningTotal = runningTotal + Number(num);
        document.getElementById('runningTotal').innerHTML = runningTotal;
    }
    cardElem = document.getElementById(card);
    element = document.getElementById(id);
    element.style['text-shadow'] = '0 0 0 #ffffff00, 0 0 0 #ffffff00, 0 0 0 #fffFFf00, 0 0 0 #ffffff00';;
    element.alt = card;
    element.innerHTML = cardElem.innerHTML;
    element.disabled = false;
    cardElem.disabled = true;
    play[id] = card;
    document.getElementById(next[0]).style['text-shadow'] = '-1px -1px 0 #ffffff, 1px -1px 0 #ffffff, -1px 1px 0 #ffffff, 1px 1px 0 #ffffff';
}

function addGo(){
    id = next.shift();
    play[id] = 'GO';
    element = document.getElementById(id);
    element.style['text-shadow'] = '0 0 0 #ffffff00, 0 0 0 #ffffff00, 0 0 0 #fffFFf00, 0 0 0 #ffffff00';;
    element.alt = 'GO';
    element.innerHTML = '-';
    element.disabled = false;
    document.getElementById(next[0]).style['text-shadow'] = '-1px -1px 0 #ffffff, 1px -1px 0 #ffffff, -1px 1px 0 #ffffff, 1px 1px 0 #ffffff';
}

function endPlay(){
    while (next[0] != 'd3'){
        addGo();
    }
}

function removeCard(id){
    element = document.getElementById(id);
    card = element.alt;
    cardElem = document.getElementById(card);
    element.style['text-shadow'] = '-1px -1px 0 #ffffff, 1px -1px 0 #ffffff, -1px 1px 0 #ffffff, 1px 1px 0 #ffffff';
    next.unshift(id);
    element.alt = id;
    element.innerHTML = id;
    element.disabled = true;
    document.getElementById(card).disabled=false;
    play[id]='XX';
    document.getElementById(next[1]).style['text-shadow'] = '0 0 0 #ffffff00, 0 0 0 #ffffff00, 0 0 0 #fffFFf00, 0 0 0 #ffffff00';
    if (!('d1d2d3d4cc'.includes(id))){
        num = cardElem.name;
        runningTotal = runningTotal - Number(num);
        document.getElementById('runningTotal').innerHTML = runningTotal;
    }
}

function download(){
    let blobdtMIME = new Blob([rounds], { type: "text/plain" })
    let url = URL.createObjectURL(blobdtMIME)
    let anele = document.createElement("a")
    anele.setAttribute("download", "game.txt");
    anele.href = url;
    anele.click();
    console.log(blobdtMIME)
}