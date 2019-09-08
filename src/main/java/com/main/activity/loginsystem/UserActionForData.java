package com.main.activity.loginsystem;


import com.main.dao.DataBaseOP;
import com.main.dao.UserInfoDBOP;
import com.main.DynamicLayer.User;
import com.main.Model.UserModel;
import net.sf.json.JSONObject;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@RestController
public class UserActionForData {


    UserModel userModel;

    UserModel dbModel;
    JSONObject userJson;
    public static Map<String, LoginUser> loginUserMap  = new HashMap<>();

    @PostMapping("/loginNoneHtml")
    public String login(String user_acc,String mode){

        if (mode.equals("test")){

            loginUserMap.put(user_acc,new LoginUser());
            System.out.println("用户以test的方式登录！");

        }



        return "success";

    }

    @PostMapping("/ss")
    public String getKey(String user_acc,String user_pwd) throws Exception {


            System.out.println(user_acc);
    try{
        userModel = (UserModel)JSONObject.toBean(userJson,UserModel.class);
        //System.out.println(userModel.user_acc);
        dbModel = UserInfoDBOP.getUserInfoModelListSingle(user_acc);


        // System.out.println(userModel.user_pwd +"<><>"+dbModel.user_pwd);
//
        if(user_pwd .equals(dbModel.user_pwd) ){

            System.out.println("登录成功！");
            String reValue = UserActionForHtml.randomValue;
            new User(UserActionForHtml.randomValue,user_acc,user_pwd);

            UserActionForHtml.randomValue = "";
            Random rd = new Random();
            for (int i =0;i<10;i++)
            {
                UserActionForHtml.randomValue += Math.abs(rd.nextInt()%10);

            }

            return  reValue;

        }


    }catch (Exception e){

        return "222";

    }
    //    userJson =  JSONObject.fromObject(message);
//
        return "222";

    }
    @PostMapping("/getUserModel")
    public JSONObject getUserModel(String user_acc) throws Exception {

        return DataBaseOP.requestSingle(DataBaseOP.dbName,"select * from user_info where user_acc="+"'"+user_acc+"'");



    }

    @PostMapping("/payforpushtask")
    public String getUserModel(String user_acc,String value) throws Exception {

        JSONObject playerObj = DataBaseOP.requestSingle(DataBaseOP.dbName,"select * from user_info where user_acc="+"'"+user_acc+"'");

        int writeValue = new Integer(playerObj.get("user_gold").toString()) - new Integer(value) ;

        System.out.println("写入值 = "+writeValue);
        if (writeValue <0)
        {

            return "false";

        }else {
            DataBaseOP.requestNoReturn(DataBaseOP.dbName,"update user_info set user_gold = "+writeValue);

            return  "true";

        }



    }
}
