

function onLogin()
{
      var  uc =  $("#login_acc_input").val();
      var  pwd = $("#login_pwd_input").val();


         //    alert(uc+"<>"+pwd);
    message = {
    "user_acc":uc,

    "user_pwd":pwd

    }
    //alert(uc+"<>"+pwd);
    var skey = null;
    var vx = JSON.stringify(message);


    localStorage.setItem("user_acc",uc);
    localStorage.setItem("user_pwd",pwd);

     $.post(localStorage.getItem("system_site")+"/ss",message,function(text,status){

     if(text!= "222")
     {

             skey = text;

             localStorage.setItem('loginkey',localStorage.getItem("system_site")+"/login?skey="+skey);
             $(window).attr("location",localStorage.getItem("system_site")+"/login?skey="+skey);


     }else{
        $.post(localStorage.getItem("system_site")+'/getUserModel?user_acc='+localStorage.getItem("user_acc"),function(data){

                localStorage.setItem('user_name',data.user_name);


                });

     }

  });







}







function getSendModel(){

  var  uc =  $("#login_acc_input").val();
  var  pwd = $("#login_pwd_input").val();

    loginModel={
        "user_acc":uc ,
        "user_pwd":pwd

        }
return JSON.stringify(loginModel);

}