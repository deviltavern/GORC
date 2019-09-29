
//ziti/www124.ttf
function loadFont(fontName,src) {

    var e1 = document.createElement("style");
    var e2 = document.head.appendChild(e1);
    e2.rel = "stylesheet";
    e2.type = "text/css";
    e2.innerHTML = "@font-face {\n" +
        "    font-family: "+fontName+";\n" +
        "    src: url(\""+src+"\")\n" +
        "}";

//<link rel="stylesheet" type="text/css" href="SheildDemo.css">

}


//元素创建
function createimg(src,width,height) {
    var img1 = document.createElement("img");

    var img = document.body.appendChild(img1);
    img.src = src;
    img.style.borderRadius = "50%";
    img.style.width = width+"px";
    img.style.height = height+"px";


    return img;
}
function createimg(src,width,height,boder) {
        var img1 = document.createElement("img");

        var img = document.body.appendChild(img1);
        img.src = src;
        img.style.borderRadius = boder +"%";
        img.style.width = width+"px";
        img.style.height = height+"px";

    return img;
}

/**
 * 创建Input标签
 *
 * @returns {HTMLInputElement}
 */
function createInput() {


    var e1 = document.createElement("input");
    var e2 = document.body.appendChild(e1);


    e2.style.width = "300px";
    e2.style.zIndex = "100";
    e2.style.position = "absolute";
    e2.style.heigt = "50px";
    e2.onchange = function (ev) {

        console.info("123");
    }
    return e2;
}

function createRangeInput() {
    var input = createInput();

    input.type = "range";

    return input;
}

function createLabel(content,width,height) {
    var t1 = document.createElement("p");

    var t2 = document.body.appendChild(t1);

    t2.style.width = width+"%";
    t2.style.height = height+"px";
    t2.style.fontFamily = "myTwwe";
    t2.background = "rgba(0,0,0,0)";
    t2.style.fontSize = "25px";
    t2.innerText = content;


    return t2;

}

/**
 * 创建iframe
 * @param src
 */
function iframe(src){

    var e1 = document.createElement("iframe");
    var e2 = document.body.appendChild(e1);
    e2.frameBorder = "0";
    e2.scrolling = "no";
    e2.width = "100%";
    e2.height = 70+"px";
    e2.marginHeight = "0px";
    e2.marginWidth = "0px";
    e2.src = src;




}

function button(value,width,height) {

    var e1 = document.createElement("input");
    var e2 = document.body.appendChild(e1);
    e2.style.width = width;
    e2.style.height = height;


}
//属性设置
function setPosition(img,pos) {

    img.style.position = "absolute";
    img.style.left = pos.x + "px";
    img.style.top = pos.y+"px";

}

function setPositionWithPercent(origin,pos) {


    origin.style.position = "absolute";
    origin.style.left = pos.x + "%";
    origin.style.top = pos.y+"%";

}

function setScale(origin,vector2) {

    origin.style.width = vector2.x+"%";
    origin.style.height = vector2.y+"%";


}
function getPosition(element) {


    var x = element.style.top;
    var y = element.style.left;
    var deleteLen = 0;
    if(x.indexOf("%") != -1){

        deleteLen = 1;
    }else
    {
        deleteLen = 2;
    }

    //var x1 = x.splice(x.length-2,2);
    var b = new Array();
    for (var i = 0 ;i<x.length - deleteLen;i++){

        b.push(x[i]);
    }

    var pos = {};
    var bs = b.join("");
    pos.y = bs;
    b.length = 0;
    for (var i = 0 ;i<y.length - deleteLen;i++){

        b.push(y[i]);
    }

    bs = b.join("");

    pos.x = bs;


    return pos;
}

function setRotation(element,value) {
    element.style.transform = "rotate("+value+"deg)"
    element.rotation = value;

}
function Vector3(x,y) {
    var temp = {};
    temp.x = x;
    temp.y = y;
    return temp;

}

function log(obj) {
    console.info(JSON.stringify(obj));

}

function setAnimation() {


}
function setParent(son,parent) {

    parent.appendChild(son);

}

function Add(p1,p2) {
    var temp = {};

    temp.x = parseFloat(p1.x)+p2.x;
    temp.y =  parseFloat(p1.y)+p2.y;
    return temp;
}

//----------------Animation-----------------------//

var animationEventArray = new Array();

function addAnimation(element) {
    animationEventArray.push(element);

}
function initAnimation() {
    op = function () {
        for (var i in animationEventArray){

            animationEventArray[i].doAnimation();


        }

    }
    frame();

}
var op;
var start = null;

var fps = 60
var fpsInterval = 1000 / fps
var last = new Date().getTime() //上次执行的时刻
function frame() {


    var now = new Date().getTime()
    var elapsed = now - last;
    // 经过了足够的时间
    if (elapsed > fpsInterval) {
        last = now - (elapsed % fpsInterval); //校正当前时间

        // 循环的代码
        // drawSomething()
        if (op!= null){

            op();
        }
    }
    requestAnimationFrame(frame);

}

function circleEvent(circleTime) {

    var circler = {};
    circler.circleTime = circleTime;
    circler.dynamicX = 0;
    circler.dynamicBorder = false;

    circler.func = function (time) {
       // console.info(time);
    };

    circler.run = function () {


        if(circler.dynamicX>=circler.circleTime){
            circler.dynamicBorder = true;

        }

        if (circler.dynamicX<=0)
        {
            circler.dynamicBorder = false;
        }

        if(circler.dynamicBorder == false){

            circler.dynamicX+= 1;
        }else{

            circler.dynamicX -= 1;
        }
       // console.info("123");

        circler.func(circler.dynamicX);
    }

    return circler;
}

//----------------Animation-----------------------//