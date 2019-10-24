

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



function login(userData,func) {

    requestServer("/loginEvent",function (ip) {
        $.post(ip,userData,function (data) {
            func(data);
        });
    });

}

/**
 *
 * @param jsonData
 * jsonData = {
 *  key:123
 * }
 *
 *
 * @param func
 */
function getEmailListByReceiver(jsonData,func) {
    requestServer("/getEmailListByReceiver",function (ip) {
        $.post(ip,jsonData,function (data) {
            func(data);
        });
    });
}

/**
 *
 * @param jsonData = {
 *     key:123
 * }
 * @param func
 */
function getEmailListBySender(jsonData,func) {
    requestServer("/getEmailListBySender",function (ip) {
        $.post(ip,jsonData,function (data) {
            func(data);
        });
    });
}

/**
 *
 * @param
    jsonData = {
    "email_id": "RPlYtUkYCnID",
    "email_head_info": "你是傻逼",
    "email_receiver": "yk",
    "email_type": 3,
    "email_content": "23333333333",
    "email_append_source": "none",
    "email_sender": "yk"
  }
 demo : /static/Html/email/sendEmailDemo.html
 * @param func
 */
function sendEmail(jsonData,func) {
    requestServer("/sendEmail",function (ip) {
        $.post(ip,jsonData,function (data) {
            func(data);
        });
    });
}

