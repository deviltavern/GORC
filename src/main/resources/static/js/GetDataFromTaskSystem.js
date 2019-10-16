

function getTaskList(func) {


    requestServer("/getTaskModelList",function (ip) {

        $.post(ip,{},function (data) {
            func(data);
        });
    });


}

function getTaskListByType(type,func) {

    var requestData = {};
    requestData.type= type;
    requestServer("/getTaskDataByType",function (ip) {

        $.post(ip,requestData,function (data) {
            func(data);
        });
    });

}

