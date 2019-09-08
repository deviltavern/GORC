
function getServer() {

    return "localhost:8099";
}

function getURL(url) {
     var c =  "http://"+getServer()+url;
     return c;
}