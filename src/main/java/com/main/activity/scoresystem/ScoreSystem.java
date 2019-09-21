package com.main.activity.scoresystem;

import com.main.dao.DataBaseOP;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.web.bind.annotation.GetMapping;
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

    /**
     * @description: 获取积分记录表
     * @return:
     */
    @GetMapping("/getScoreRecord")
    public JSONObject getScoreRecord() throws Exception {
        JSONArray tempjr=DataBaseOP.request("select * from score_record");
        JSONObject jsOb=toTableData(tempjr);
        jsOb.put("msg", "积分记录表");
        System.out.println(jsOb.toString());

        return jsOb;
    }

    /**
     * @description: 将从数据库中查询得到的JSONArray类型数据转化为表格展示需要的JSONObject类型
     * @return: html需要的表格数据格式
     */
    public JSONObject toTableData(JSONArray jr){
        JSONObject jsonOb=new JSONObject();
        jsonOb.put("code", 0);
        jsonOb.put("msg", "");
        jsonOb.put("count", jr.size());
        jsonOb.put("data", jr);
        return jsonOb;
    }
    /**
     * @description: 表格数据测试
     * @return:
     */
    @GetMapping("/scoreTableTest")
    public JSONObject scoreTableTest() {
        String str="{'code':0,'msg':'','count':1000,'data':[{'id':10000,'username':'user-0','sex':'女','city':'城市-0','sign':'签名-0','experience':255,'logins':24,'wealth':82830700,'classify':'作家','score':57},{'id':10000,'username':'user-0','sex':'女','city':'城市-0','sign':'签名-0','experience':255,'logins':24,'wealth':82830700,'classify':'作家','score':57}]}";
        JSONObject myJson = JSONObject.fromObject(str);
        System.out.println(myJson);
        return myJson;
    }
}
