orange = 10;

shapes = [
    {
        pink: 10
        , yellow: 20
        , prevOffset: 0
        , roatated: 0
        , offsetNext: Math.atan(10/20)
    },{
        pink: 20
        , yellow: 20
        , offSet: Math.atan(10/20)
        , rotated: 0 + Math.atan(10/20)
        , offsetNext: Math.atan(20/20)
        , translateY: 0
        },{
        pink: 20
        , yellow: 10
        , offset: Math.atan(20/20)
        , rotated: 0 + Math.atan(10/20) + Math.atan(20/20)
        , offsetNext: Math.atan(20/10)
        , height: Math.sin()
    }
]

function insertShape(i){
    svg = document.getElementById("js");
    shape = `
    <g id="box${i}" transform="translate(${translateX},${translateY})rotate(${rotation})" style="filter: drop-shadow(1px 2px 3px rgb(0 0 0 / 0.4));">
    <rect fill="orange" width="${orange}" height="${height}" x="0" y="0"/>
    <rect fill="pink" width="${pink}" height="${pink}" x="${orange}" y="${(height/2)-pink}" />
    <rect fill="yellow" width="${yellow}" height="${yellow}" x="${orange}" y="${(height/2)}" />
    </g>`
}

function shiftX(){

}

function shiftY(){

}

function setOffset(b1,b2){
    //console.log(b1,b2,rotation);
    if (b1 != b2){
        a = Math.max(b1,b2);
        b = Math.min(b1,b2);
       // console.log(a,b)

        a -= b;

        offset = Math.atan(a/b);
        offsetDeg = offset * (180 / Math.PI);

        if (b1 > b2){
            rotation += offsetDeg;

        } else {
            rotation -= offsetDeg;
        }
    } else {
        offset = 0;
    }
}