
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

    return fontName;
//<link rel="stylesheet" type="text/css" href="SheildDemo.css">

}

function loadCSS(src) {

    var lik=  document.createElement("link");

    document.head.appendChild(lik);

    lik.rel = "stylesheet";
    lik.href = src;

}

function loadJS(src) {
    var script=  document.createElement("script");

    document.head.appendChild(script);

    script.src = src;

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
    e2.width = 100+"%";
    e2.height = 70+"px";



    e2.src = src;


return e2;


}
function textInput() {

    var input = document.createElement("input");
    input.type = "text";


    return input;

}

function hilabel(content,i) {
    var p = document.createElement("h"+i);
    p.innerText = content;
    return p;
}
function textareaInput() {

    var input = document.createElement("textarea");


    return input;
}

function fileInput() {
    var input = document.createElement("input");
    input.type = "file";
    input.name = "file";

    return input;

}
function button(value,src,width,height,left,top) {

    var e1 = document.createElement("input");
    var e2 = document.body.appendChild(e1);
    e2.style.width = width+"%";
    e2.style.height = height+"%";
    e2.style.zIndex = "30";
    e2.style.position = "absolute";
    e2.value = value;
    e2.type = "button";
    e2.style.backgroundImage = "url("+src+")";
    e2.style.backgroundSize = "100%";
    e2.style.borderRadius = "30px";
    e2.style.left = left+"%";
    e2.style.top = top +"%";

    return e2;


}


function img() {
    var ig = document.createElement("img");

    return ig;

}
function canvas(width,height,x,y) {
    var canvasObj = {};

    var  e1 = document.createElement("canvas");
    var e2 = document.body.appendChild(e1);
    e2.style.width = width+"px";
    e2.style.height = height+"px";
    e2.style.position = "absolute";
    e2.style.top = y+"%";
    e2.style.left = x+"%";

    e2.style.background = "rgb(123,123,123)";

    e2.width = width;
    e2.height = height;
    canvasObj.canvas = e2;
    canvasObj.context = e2.getContext("2d");

    canvasObj.origin = Vector2(width/2,height/2);


    return canvasObj;


}
function table(width,caption) {

    var d1 = document.createElement("div");
    var ld = document.body.appendChild(d1);
    ld.style.width = width+"px";
    ld.style.margin = "0 auto";

    var tb = document.createElement("table");
    var ltb = ld.appendChild(tb);
    ltb.style.alignment = "center";
    ltb.style.width = "100%";

    var cp = document.createElement("caption");
    var lcp = tb.appendChild(cp);
    lcp.style.textAlign = "center";
    lcp.style.fontSize = "20px";
    // lcp.
    lcp.innerText = caption;
    tb.cap = cp;

       tb.trArray = new Array();
    tb.valueArray = new Array();

    tb.parent = d1;
    tb.addCol = function(data){

        tb.valueArray.push(data);
    }

    tb.inssertColum = function () {

        var tempTr = tr(tb,24);
        tb.trArray.push(tempTr);
        for (var i in tb.valueArray){

            var tempTd = td(tempTr,tb.valueArray[i]);
        }
        tb.valueArray.length = 0;
    };



    return tb;


}

function tr(parent,fontSize) {
    var d1 = document.createElement("tr");
    var ld = parent.appendChild(d1);
    ld.style.fontSize = fontSize+"px";

    return ld;

}

function tdwithImg(parent,src,text) {
    var _td = document.createElement("td");
    var ltd = parent.appendChild(_td);


    ltd.style.verticalAlign= "bottom";

    var d1 = document.createElement("img");
    var ld1 = ltd.appendChild(d1);
    ld1.style.position = "absolute";
    ld1.src = src;
    ld1.style.width = 30+"px";
    // var d2 = document.createElement("p");
    // var ld2 = ltd.appendChild(d2);

    var d3 = document.createElement("nobr");

    var ld3 = ltd.appendChild(d3);
    ld3.style.position = "relative";
    ld3.style.left = "40px";
    ld3.style.fontSize = "25px";
    ld3.innerText = text;


    return _td;
}
function td(parent,text) {
    var _td = document.createElement("td");
    var ltd = parent.appendChild(_td);
    ltd.wordWrap ="break-word";
    ltd.wordBreak = "break-all";
    ltd.style.verticalAlign= "top";
    var d3 = document.createElement("p");
    var ld3 = ltd.appendChild(d3);

    ld3.style.position = "relative";
    ld3.style.left = "40px";
    ld3.style.fontSize = "25px";
    ld3.innerText = text;
    return _td;
}
function a(src) {

    var a = document.createElement("a");
    a.href = src;
    return a;
}
function div(width,height) {
    var tempDiv = document.createElement("div");
    var ltempDiv = document.body.appendChild(tempDiv);
    ltempDiv.style.width = width+"%";
    ltempDiv.style.height = height +"px";
    return ltempDiv;

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

function setColor(orign,rbg) {

    orign.style.backgroundColor = rbg;
}

function setFontColor(origin,rgb) {
    origin.style.color = rgb;

}
function setBorder(origin,type,value) {

    switch (type) {
        case 0:

            origin.style.borderRadius = value;
            break;

        case 1:

            break;

        default:

            break;
    }

}
function setParent(origin,parent,id) {


    parent.appendChild(origin);
    if(parent.childArray == null){

        parent.childArray = [];

        parent.findChild = function (chilidID) {

            for(var i in parent.childArray){

                if(parent.childArray[i].id === chilidID){

                    return parent.childArray[i];
                }
            }
        }
        var describe = {};

        describe.id = id;
        describe.object = origin;
        parent.childArray.push(describe);
    }else {
        var describe = {};

        describe.id = id;
        describe.object = origin;
        parent.childArray.push(describe);

    }
}
function setUnderline(origin,width,offset) {


}
function setLayer(origin,layer) {
    origin.style.zIndex = layer;
}
function setBackColor(origin,color) {

    origin.style.backgroundColor =  color;
}
function setCSS(origin,css) {

    origin.style = "";
    origin.className = css;
}

function setBackGroundImage(origin,src) {

    if(src === "none"){

        origin.style.backgroundSize = "";
        origin.style.backgroundImage = "";
    }
    origin.style.backgroundSize = "100%";
    origin.style.backgroundImage = "url('"+src+"')";

}
function setCSSWithoutDamage(origin,css) {
    origin.className = css;
}



function setStyle_Top(origin,value) {

    origin.style.top = value;

}
function addCSS(origin,css) {

    origin.className += " "+css;

}

function showElement(origin) {
    origin.style.display = "";

}
function hideElement(origin) {
    origin.style.display = "none";

}
//---------------字体-------------------------------------------------------------------------------------------

function setFont(origin,fontFamily) {
    origin.style.fontFamily = fontFamily;
}
function setFontSize(origin,fontSize) {
    origin.style.fontSize = fontSize;
}
function setFontUnderline(origin,ef) {
    origin.style.textDecoration = ef;

}
function setText(origin,content) {
    origin.innerText = content;
}


//-------------------通用属性----------------------------
function Vector3(x,y) {
    var temp = {};
    temp.x = x;
    temp.y = y;
    return temp;

}
function Vector2(x,y) {

    var temp = {};
    temp.x = x;
    temp.y = y;
    return temp;
}
function Color24(r,g,b) {

    var rg = "rgb("+r+","+g+","+b+")";
    return rg;

}
function Color32(r,g,b,a) {

    var rg = "rgba("+r+","+g+","+b+","+a+")";
    return rg;

}
function Color(r,g,b) {

    var color = {};
    color.r = r;
    color.g = g;
    color.b = b;

    color.ox = (color.r << 16) | (color.g << 8) | color.b;

    return color;
}




function log(obj) {
    console.info(JSON.stringify(obj));

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
var singleOp;
var fps = 60
var fpsInterval = 1000 / fps
var last = new Date().getTime() //上次执行的时刻
var elapsed;
function frame() {


    var now = new Date().getTime()
    elapsed = now - last;

    //console.info(elapsed);
    // 经过了足够的时间
    if (elapsed > fpsInterval) {
        last = now - (elapsed % fpsInterval); //校正当前时间

        // 循环的代码
        // drawSomething()
        if (op!= null){

            op();
        }

        if(singleOp!= null){

            singleOp();
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

function endlessLoop() {
    var circler = {};

    circler.dynamicX = 0;
    circler.dynamicBorder = false;

    circler.func = function (time) {
        // console.info(time);
    };

    circler.run = function () {

        circler.dynamicX += 1;
        circler.func(circler.dynamicX);
    }

    return circler;
}
function endlessLoopWithLimit(timeLimit) {
    var circler = {};

    circler.limit = timeLimit;
    circler.dynamicX = 0;
    circler.dynamicBorder = false;

    circler.func = function (time) {
        // console.info(time);
    };

    circler.run = function () {

        if(circler.dynamicX>circler.limit){

            return;
        }
        circler.dynamicX += 1;
        circler.func(circler.dynamicX);
    }

    return circler;
}
//----------------Time-----------------------//


// var seconds = GetDateDiff(str2Date('2019-10-01 17:01:58'),new Date());
function getDateDiff(startTimeDate, endTimeDate) {


    var diff = 0;
    var difDat = startTimeDate.getDate() - endTimeDate.getDate();
    var difHour = startTimeDate.getHours() - endTimeDate.getHours();
    var difMil = startTimeDate.getMinutes() - endTimeDate.getMinutes();
    var difSecon = startTimeDate.getSeconds() - endTimeDate.getSeconds();

    diff = difDat*24*60*60+ difHour*60*60+difMil*60+difSecon;

    return -diff;



}

function str2Date(str) {

    var new_time_str = str.replace(/-/g, '/')
    var newtime = new Date(new_time_str)
    return newtime;
}

function getDaySecond(dayNum) {

    return dayNum*24*60*60;
}

function getDateFromSeconds(seconds) {

    var day = parseInt( seconds/(60*60*24));

    var resthour = seconds - day*(60*60*24);
    var hour = parseInt( resthour/(60*60));

    var restMinites = resthour - hour*60*60;
    var minit = parseInt( restMinites/(60));
    var restSeconds = restMinites - minit*60;
    return day+":"+ hour+":"+minit+":"+restSeconds;

}
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
//---------------------------------------------------后端------------------------------------------------//
/**
 * 从Input标签中获得数据源，绑定到Formdata中，可以直接上传到服务器
 * @param fileInputTag
 * @param fileName
 * @returns {boolean|FormData}
 */
function getFileSourceFromInputTag(fileInputTag,fileName) {
    var $icon = $(".upload-icon");
    var formData = new FormData(),
        fs = fileInputTag.files;
    var max_size = 1024 * 1024 * 100

    for (var i = 0; i < fs.length; i++) {
        var d = fs[0]
        if(d.size <= max_size){  //文件必须小于100M

            formData.append(fileName, fs[i]);
            console.info(formData);

        }else{
            alert('上传文件过大！');
            return false
        }
    }

    return formData;


}

function uploadFormdata(url,formData) {

    $.ajax({
        type: "POST",
        url: url,
        data: formData,
        cache: false,
        processData: false,
        contentType: false

    });
}
//将file和本地文件建立映射关系，获得本地资源的url(通过input标签)
function getObjectURL(file)
{
    var url = "";
    if(window.createObjectURL!=undefined)
    {
        url = window.createObjectURL(file);
    }
    else if(window.URL!=undefined)
    {
        url = window.URL.createObjectURL(file);
    }
    else if (window.webkitURL != undefined)
    {
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}

//---------------------------随机序列-------------------------------------------------
function getRandomUUID(length) {
    if (length > 0) {
        var data = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        var nums = "";
        for (var i = 0; i < length; i++) {
            var r = parseInt(Math.random() * 61);
            nums += data[r];
        }
        return nums;
    } else {
        return false;
    }
}


//-------------------------------------------window相关--------------------------------

function absoluteWindow() {
    document.body.style.position = "absolute";
    document.body.style.width = window.innerWidth*0.98+"px";
    document.body.style.height = window.innerHeight+"px";
}