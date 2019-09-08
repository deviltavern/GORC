
var server = localStorage.getItem("system_site");
String.prototype.replaceAll=function(a,b){//吧a替换成b
    var reg=new RegExp(a,"g"); //创建正则RegExp对象
    return this.replace(reg,b);
    }

$.post(server+'/getTaskModelList',function(data){


    var index = 0;

    for (var i = 0; i < data.length; i++) {


      //  alert(JSON.stringify(data[i]));
       insNewTable('sf_table',i +"",JSON.stringify(data[i]));

    }

})
function insNewTable(tableName,id,value)
{
    $('#'+tableName).before('<tbody id = "'+tableName+id+'"></tbody>');

    obj = JSON.parse(value);

    for (var val in obj) {

        var v =  obj[val]+"";
      v = v.replace('<','&lt');

          v  = v .replaceAll('9999999','{');
          v  = v .replaceAll('8888888','}');
          //7777777
          v  = v .replaceAll('77777777777777','"');
          v  = v .replaceAll('7777777','');
       // alert("插入值:"+val+"<>"+obj[val]);
        $('#'+tableName+id).before('<td>'+v+'</td>')

    }

}


var a;
a = { "name":"runoob", "alexa":10000, "site":null };

function getJsonString(x){
    return JSON.stringify(x);
}

