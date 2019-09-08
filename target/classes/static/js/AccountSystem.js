
//if user this js file please add Config.js/jqueryLibrary before this


function openWindow(value) {


    r =   confirm(value);


    return r;
}

function deductSocre(user_acc,value,func) {

    var a = {};
    a.user_acc = user_acc;
    a.value = value;

    $.post(getURL("/deductScore"), a, function (data) {
        func(data);
    });

}

function addSocre(user_acc,value,func) {

    var a = {};
    a.user_acc = user_acc;
    a.value = value;

    $.post(getURL("/addScore"), a, function (data) {
        func(data);
    });

}

function deductSocreWithWindow(user_acc,value,func) {

    var a = {};
    a.user_acc = user_acc;
    a.value = value;
    var r = openWindow("是否扣除"+value+"积分");
    if(r == true){
        $.post(getURL("/deductScore"), a, function (data) {
            func(data);

            alert("扣除"+value+"积分");
        });
    }else {


    }


}
