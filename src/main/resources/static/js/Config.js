//服务器Config


var endIP = "localhost";
function getUserIP(onNewIP) { //  onNewIp - your listener function for new IPs
    //compatibility for firefox and chrome
    onNewIP(endIP);
}



//使用localhost进行数据请求
function requestServerWithLocal(url,func) {
    var sip = "";
    getUserIP(function(ip){
        sip  = ip;
        console.info(ip);

        sip =  "http://"+"localhost"+":8099"+url;
        func(sip);
    });
}
function getServerPrefix() {


    return
}
//使用公共服务进行请求。
function requestServer(url,func) {
    var ip = "localhost";
    var sip = "";
    sip  = ip;
    console.info(ip);
    sip =  "http://"+ip+":8099"+url;
    func(sip);

   console.info(sip);


}

function requestServerEX(url,msg,func) {
    var ip = "localhost";
    var sip = "";

        sip  = ip;
        console.info(ip);
        sip =  "http://"+ip+":8099"+url;

        $.post(sip,msg,function(data) {

            func(data);
        });



    console.info(sip);


}
