var socket;

var chatID;
function connect(){
    if(window.WebSocket) {
        socket = new WebSocket("ws://192.168.43.34:9001/websocket");
        socket.onopen = function (event) {


        };
        socket.onclose = function (p1) {
            alert("关闭服务器！");
        }
    }
    else {
        alert('抱歉，您的浏览器不支持WebSocket 协议！');
    }
    socket.onmessage = function (p1) {


        var reinfo = JSON.parse(p1.data);
        var main_code = reinfo.main_code;
        var sub_code = reinfo.sub_code;
        var message = reinfo.message;
        var tempSnack = null;
        // console.info(reinfo);
        switch (sub_code) {

            case 1:
                alert(message);
                chatID = message;
                break;

            case 2:


                var sp = document.getElementById("showP");
                sp.innerText += message+"\n";
                break;

            default:

                break;

        }
        // var message = reinfo.message;

        //  console.info(message.x);


    };
    function tax(value,v2){
        alert(value)
        alert(v2)

    }
}

function getChatValue(intfo) {
    var temp = {};
    temp.chatID = chatID;
    temp.info = intfo;

    return temp;

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