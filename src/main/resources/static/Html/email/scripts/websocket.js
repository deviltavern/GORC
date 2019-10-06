var socket;
var snackID;

function getSnackID() {

    return snackID;
}
var init = false;

var lastDate = new Date();
function connect(){
    if(window.WebSocket) {

        // socket = new WebSocket("ws://47.106.227.238:9001/websocket");
        socket = new WebSocket("ws://192.168.43.34:9001/websocket");

        console.info(socket.readyState+" = socket status");


        socket.onopen = function (event) {
            console.info("服务器开启完毕！")
            alert("服务器开启");
          //  send(100,0,"把我的身份证给我！");

        };
        socket.onclose = function (p1) {
            // alert("关闭服务器！");
            console.info("关闭服务器！");
        }


    }
    else {
        alert('抱歉，您的浏览器不支持WebSocket 协议！');
    }



    var dynamicTimeSum = 0;
    var tynamicTimes = 0;
    var theAnswer;
    var initPos = null;
    var netCoe = document.getElementById("netCoe");
    socket.onmessage = function (p1) {


        var reinfo = JSON.parse(p1.data);
        var main_code = reinfo.main_code;
        var sub_code = reinfo.sub_code;
        var message = reinfo.message;
        var tempSnack = null;
        console.info(reinfo);
        switch (sub_code) {

        }

    };
    function tax(value,v2){
        alert(value)
        alert(v2)

    }
}





function onClickLogin(){


}

function send(main_code,sub_code,mes) {
    if (!window.WebSocket) {
        return ;
    }
    if(socket.readyState == WebSocket.OPEN) {
        var jsonObject = {};

        jsonObject.main_code = main_code;
        jsonObject.sub_code = sub_code;
        jsonObject.message = mes;

        socket.send(JSON.stringify(jsonObject));


    }
    else {
        console.info('WebSocket 连接没有建立成功！');
    }
}


function singleSend(mes) {
    if (!window.WebSocket) {
        return ;
    }
    if(socket.readyState == WebSocket.OPEN) {


        socket.send(mes);


    }
    else {
        alert('WebSocket 连接没有建立成功！');
    }
}