    var socket;


function connect(){

}

    if(window.WebSocket) {
        socket = new WebSocket("ws://localhost:9989/websocket");

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
            // alert("服务器正常打开！");

           var ta = document.getElementById('responseText');

                       alert(p1.data);



                     //  $.get("http://localhost:8099/static/Html/hall/homepage.html",{"login":"True"},function(x){alert("seuccesss");});
                    //  $(window).session.set('login', 'true')
                     //  sessionStorage.setItem('login','true');
                     //  $(window).attr('location','http://localhost:8099/static/Html//hall/homepage.html');

                    //$.post('http://localhost:8099/mainha?opCode=3', {
                    //                        '"opCode"':'"3"'
                    //                    }, function(d) {

                    //                        //$('#spanID').text('结果是:' + d);

                    //                    }).error(function(e){
                    //                        console.log(e);
                    //                    });

                        $(window).attr('location','http://localhost:8099/mainha?opCode=3');
        };
    function tax(value,v2){
        alert(value)
        alert(v2)

    }



    function onClickLogin(){


    }

    function send(main_code,sub_code,mes) {
        if (!window.WebSocket) {
            return ;
        }
        if(socket.readyState == WebSocket.OPEN) {

            var text = ' [' +
             '{ "main_code":'+'"'+main_code+'",'+'"sub_code":'+'"'+sub_code+'",'+'"mes":'+'"'+mes+'"'+' }]';

                socket.send(text);


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