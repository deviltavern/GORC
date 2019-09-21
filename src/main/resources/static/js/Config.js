//服务器Config



function getUserIP(onNewIP) { //  onNewIp - your listener function for new IPs
    //compatibility for firefox and chrome
    var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    var pc = new myPeerConnection({
            iceServers: []
        }),
        noop = function() {},
        localIPs = {},
        ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
        key;

    function iterateIP(ip) {
        if (!localIPs[ip]) onNewIP(ip);
        localIPs[ip] = true;
    }

    //create a bogus data channel
    pc.createDataChannel("");

    // create offer and set local description
    pc.createOffer().then(function(sdp) {
        sdp.sdp.split('\n').forEach(function(line) {
            if (line.indexOf('candidate') < 0) return;
            line.match(ipRegex).forEach(iterateIP);
        });

        pc.setLocalDescription(sdp, noop, noop);
    }).catch(function(reason) {
        // An error occurred, so handle the failure to connect
    });

    //sten for candidate events
    pc.onicecandidate = function(ice) {
        if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
        ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
    };
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

    var sip = "";
    getUserIP(function(ip){
        sip  = ip;
        console.info(ip);
        sip =  "http://"+ip+":8099"+url;
        func(sip);
    });

   console.info(sip);


}

function requestServerEX(url,msg,func) {

    var sip = "";
    getUserIP(function(ip){
        sip  = ip;
        console.info(ip);
        sip =  "http://"+ip+":8099"+url;

        $.post(sip,msg,function(data){

            func(data);
        });

    });

    console.info(sip);


}
