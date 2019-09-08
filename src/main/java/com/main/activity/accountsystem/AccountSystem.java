package com.main.activity.accountsystem;

import com.main.Model.UserModel;
import com.main.Tool.JqueryRequestTool;
import com.main.dao.DataBaseOP;
import net.sf.json.JSON;
import net.sf.json.JSONObject;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AccountSystem {


    @PostMapping("/deductScore")
    public  JSONObject  deductScore(String user_acc,int value) throws Exception {
        JSONObject reObj = new JSONObject();

        JSONObject userInfo = DataBaseOP.requestSingle("select * from user_info where user_acc = '"+user_acc+"'" );
        int scoreReading = new Integer(userInfo.get("user_gold").toString());

        if((scoreReading - value)>0){

            scoreReading -= value;
            reObj.put("code",100);
            //update user_info set user_gold = 9999 where user_acc = '123'
            DataBaseOP.requestNoReturn("update user_info set user_gold = "+scoreReading+" where user_acc = '"+user_acc+"'");

        }else {

            reObj.put("code",200);
        }
        reObj.put("restValue",scoreReading);
        return reObj;
    }
    @PostMapping("/addScore")
    public  JSONObject  addScore(String user_acc,int value) throws Exception {
        JSONObject reObj = new JSONObject();

        JSONObject userInfo = DataBaseOP.requestSingle("select * from user_info where user_acc = '" + user_acc + "'");
        int scoreReading = new Integer(userInfo.get("user_gold").toString());


        scoreReading += value;
        reObj.put("code", 100);
        //update user_info set user_gold = 9999 where user_acc = '123'
        DataBaseOP.requestNoReturn("update user_info set user_gold = " + scoreReading + " where user_acc = '" + user_acc + "'");


        reObj.put("restValue", scoreReading);
        return reObj;
    }


}
