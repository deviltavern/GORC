package com.main.activity.CodeCollector;

import com.alibaba.fastjson.JSONException;
import com.main.dao.DataBaseOP;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;
@RestController
public class DBOption {
    /**
     * @description: 插入文件名
     * @return:
     */
    public static final String sql_codecollector_info_table = "select * from code_collector";

    @PostMapping("/InsertCodeFile")
    public  static String FileNameAdd(String user_acc,String user_name,String title_id,String title,String auxiliary,String filePath) throws Exception {

        DataBaseOP.requestNoReturn(DataBaseOP.dbName,
                "insert into code_collector(user_acc,user_name,question_id,question_name,solution_add,solution_name) " +
                        "values('"+ user_acc+"','"+ user_name+"','"+ title_id+"','"+ title+"','"+ auxiliary+"','"+filePath+"')");

        return filePath;
    }
    @GetMapping("/getSubmitList")
    public static JSONObject getSubmitList() throws Exception {
        JSONArray arry = DataBaseOP.request(DataBaseOP.dbName,sql_codecollector_info_table);
      //  String jsonValue = "{ \"code\":0,\"msg\":\"\",\"count\":"+arry.toString().length()+"\"data\":"+"}";
       // {"user_acc":"Ljy10086","user_name":"罗继业","titleID":"问题序号","title":"具体问题","auxiliary":"","code":""}
        JSONObject abb = new JSONObject();
        try {
            //添加
            abb.put("code", 0);
            abb.put("msg", "");
            abb.put("count", arry.toString().length());
            abb.put("data", arry);

            System.out.println(abb.toString());
        } catch (JSONException e) {
            e.printStackTrace();
        }



        return abb;

    }}
