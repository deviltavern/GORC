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
                send(100,0,"把我的身份证给我！");

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
       // console.info(reinfo);
        switch (sub_code) {

            case 0:
                alert(message);
                snackID = message;
                insNewSnackHead(snackID);
                uiControl(getSnackFromArray(getSnackID()));
                setLabelID(snackID);
                initPos = getPosition(opView.camera);
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
                    console.info(playerInfo);
                   var sk = getSnackFromArray(playerInfo.snackID);
                   if(sk!= null){


                       console.info(getPosition(sk.head));
                       //sk.moveDir = Normal(Division(playerInfo.vec - getPosition(sk.head)));
                       setPosition(sk.head,playerInfo.vec);


                   }
                }
                break;
            case 201:
                insRandomCube(message);
                break;

            case 203:
                //console.info(message);
                showEvent();
               for (var i in message) {
                   var snk = getSnackFromArray(message[i].snackID);
                   snk.bodyMsg = message[i].bodyMsg;


                   if (message[i].snackID === getSnackID()) {
                       //cameraFollow(initPos,  message[i].vec);
                   }

                     //  console.info(message[i].snackID);
                      // console.info(snk);

                       if (snk!= null){

                            //console.info(JSON.stringify(message[i].vec)+"<>"+JSON.stringify(getPosition(snk.head)) );
                            if(Equal(message[i].vec,snk.lastPos) == false){
                                snk.moveDir = Normal(Substraction(message[i].vec,snk.lastPos));
                                snk.lastPos = message[i].vec;

                               // console.info(snk.moveDir);
                            }else {

                            }

                           setPosition(snk.head,
                               message[i].vec
                           );









                       }


                  // }
               }

                var dif = new Date() - lastDate;

                tynamicTimes++;

               if (dif>1000){
                   theAnswer = tynamicTimes;
                   tynamicTimes = 0;
                   lastDate = new Date();
                   netCoe.innerText = theAnswer+"";
                  // console.info(dif);
               }


                break;
            case 204:
                tempSnack = getSnackFromArray(message.snackID);
                tempSnack.addBody();
                console.info(tempSnack);
                console.info("长身体from 204");
                break;

            case 233:

                console.info("有玩家掉线");
                console.info(message);

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