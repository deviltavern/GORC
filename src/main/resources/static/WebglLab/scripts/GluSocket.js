var socket;
var snackID;

function getSnackID() {

    return snackID;
}
var init = false;
function connect(){
    if(window.WebSocket) {
        socket = new WebSocket("ws://47.106.227.238:8080/websocket");
        socket.onopen = function (event) {
            console.info("服务器开启完毕！")
            alert("服务器开启");
            send(100,0,"把我的身份证给我！");
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
       // console.info(reinfo);
        switch (sub_code) {

            case 0:
                alert(message);
                snackID = message;
                insNewSnackHead(snackID);
                uiControl(getSnackFromArray(getSnackID()));
                setLabelID(snackID);
                break;

            case 1:

                for (var i in message)
                {
                    var cloneSnack = getSnackFromArray(message[i])
                    if(cloneSnack == null)
                    {
                        insNewSnackHead(message[i]);
                       // console.info("这条蛇你还没有，你需要生成:"+message[i]);
                    }
                }

                break;
            case 2:
                for (var i in message)
                {
                    var playerInfo =message[i];

                   var sk = getSnackFromArray(playerInfo.snackID);
                   if(sk!= null){

                       setPosition(sk.head,playerInfo.vec);
                   }
                }
                break;
            case 201:
               // insRandomCube(message);
                break;

            case 203:
                //console.info(message);
               for (var i in message) {

                   if (message[i].snackID != getSnackID()){
                     //  console.info(message[i].snackID);
                       var snk = getSnackFromArray(message[i].snackID);
                      // console.info(snk);
                       if (snk!= null){

                           setPosition(snk.head,
                               message[i].vec
                           );
                       }


                   }
               }

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
        alert('WebSocket 连接没有建立成功！');
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