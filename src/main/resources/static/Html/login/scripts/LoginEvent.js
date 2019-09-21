
//--------------------------------------变量Block------------------------------//
var userAccInput = document.getElementById("loginUserAccInput");
var userPwdInput = document.getElementById("loginUserPwdInput");
var userLoginBtn = document.getElementById("loginPageLoginBtn");
var userRegisterBtn = document.getElementById("loginPageRegisterBtn");

var loginPage = document.getElementById("loginPage");


var registerPage = document.getElementById("registerPage");

var registerPageRegisterSuccessBtn = document.getElementById("registerSuccessBtn");
var registerPageRegisterFailedBtn = document.getElementById("registerFailedBtn");

//--------------------------------------函数Block------------------------------//
function getUserAcc() {
    return userAccInput.value;
}
function getUserPwd() {
    return userPwdInput.value;

}


//--------------------------------------事件Block------------------------------//

getUserIP(function (ip) {

    localStorage.setItem("system_site","http://"+ip+":8099");

   console.info(ip);
});

userLoginBtn.onclick = function (ev) {

    console.info("login！");

   var message = {};

   message.user_acc = getUserAcc();
   message.user_pwd = getUserPwd();
    localStorage.setItem("user_acc",getUserAcc());
    localStorage.setItem("user_pwd",getUserPwd());

    console.info(message);
    requestServerEX("/loginEvent",message,function (data) {
        console.info(data);
        localStorage.setItem('loginkey',localStorage.getItem("system_site")+"/login?skey="+data);
        requestServer("/login?skey="+data,function (ip) {
            localStorage.setItem('loginkey',ip);
            console.info(ip);
            $(window).attr("location",ip);
        });


    });
}
userRegisterBtn.onclick = function (ev) {
    console.info("register！");

    registerPage.setAttribute("style","");
}

registerPageRegisterFailedBtn.onclick = function (ev) {

    registerPage.setAttribute("style","display:none");


}
