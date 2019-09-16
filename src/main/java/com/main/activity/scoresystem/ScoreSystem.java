package com.main.activity.scoresystem;

import com.main.dao.DataBaseOP;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Create by fan on 2019/9/14
 */
@RestController
public class ScoreSystem {
    /**
     * @description: 获得系统时间并转为String类型
     * @return:
     */
    public String getDatetime(){
        Date date = new Date();//获取当前的日期
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        String str = df.format(date);//获取String类型的时间
        return str;
    }
    /**
     * @description: 查询积分值
     * @return: 积分值的json对象
     */
    @PostMapping("/scoreShow")
    public JSONObject scoreShow(String user_acc) throws Exception {

        //System.out.println("scoreShow:" + user_acc);
        String sql_ScoreShowByUser_acc = "select user_gold from user_info where user_acc='123'";

        JSONArray tempjr = DataBaseOP.request(sql_ScoreShowByUser_acc);
        //System.out.println(tempjr.getJSONObject(0));
        return tempjr.getJSONObject(0);
    }
    /**
     * @description: 扣除积分
     * @return:
     */
    @PostMapping("/scoreDeduct")
    public  JSONObject  scoreDeduct(String user_acc,int operate_value) throws Exception {
        JSONObject reObj = new JSONObject();

        JSONObject userInfo = DataBaseOP.requestSingle("select * from user_info where user_acc = '"+user_acc+"'" );
        int scoreReading = new Integer(userInfo.get("user_gold").toString());
        //System.out.println("score:"+scoreReading);

        if((scoreReading - operate_value)>0){

            scoreReading -= operate_value;
            reObj.put("code",100);
            //update user_info set user_gold = 9999 where user_acc = '123'
            DataBaseOP.requestNoReturn("update user_info set user_gold = "+scoreReading+" where user_acc = '"+user_acc+"'");
            DataBaseOP.requestNoReturn("insert into score_record(" +
                    "user_acc,operate_value,rest_value,sc__re_description,operate_time)" +
                    "values('"+user_acc+"',"+-operate_value+","+scoreReading+",'扣除积分','"+
                    getDatetime()+"')");
        }else {

            reObj.put("code",200);
        }
        reObj.put("rest_value",scoreReading);
        return reObj;
    }

    /**
     * @description: 增加积分
     * @return:
     */
    @PostMapping("/scoreAdd")
    public  JSONObject  scoreAdd(String user_acc,int operate_value) throws Exception {
        JSONObject reObj = new JSONObject();

        JSONObject userInfo = DataBaseOP.requestSingle("select * from user_info where user_acc = '" + user_acc + "'");
        int scoreReading = new Integer(userInfo.get("user_gold").toString());

        scoreReading += operate_value;
        reObj.put("code", 100);
        //update user_info set user_gold = 9999 where user_acc = '123'
        DataBaseOP.requestNoReturn("update user_info set user_gold = " + scoreReading + " where user_acc = '" + user_acc + "'");
        DataBaseOP.requestNoReturn("insert into score_record(" +
                "user_acc,operate_value,rest_value,sc__re_description,operate_time)" +
                "values('"+user_acc+"',"+operate_value+","+scoreReading+",'增加积分','"+
                getDatetime()+"')");
        reObj.put("rest_value", scoreReading);
        return reObj;
    }

    @PostMapping("/getScoreRecord")
    public JSONArray getScoreRecord() throws Exception {
        JSONArray tempjr=DataBaseOP.request("select * from score_record");

        return tempjr;
    }
}
