function seriValue2JSON(value) {
    var tmpDic={};
    for(var i in value.split("&")){
        var row=value.split("&")[i];
        tmpDic[row.split("=")[0]]=decodeURIComponent(row.split("=")[1]);
    }

    return tmpDic;
}
