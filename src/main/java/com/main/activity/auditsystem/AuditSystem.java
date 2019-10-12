package com.main.activity.auditsystem;

import com.main.Tool.JqueryRequestTool;
import com.main.dao.DataBaseOP;
import net.sf.json.JSON;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.xml.crypto.Data;

@RestController
public class AuditSystem {



    @PostMapping("/sendApplicationInfo")
    public JSONObject sendApplicationInfo(HttpServletRequest request) throws Exception {

        JSONObject tempObject = new JSONObject();
        JqueryRequestTool tool = new JqueryRequestTool(request);

        DataBaseOP.requestNoReturn(tool.getInsertSql("task_log_for_application"));
        return tempObject;
    }

    @PostMapping("/getApplicationInfoByStatus")
    public JSONArray getApplicationInfoByStatus(String type) throws Exception {

        String sql = "select * from task_log_for_application where task_status = '"+type+"'";
        JSONArray jsonArray = DataBaseOP.request(sql);


        return  jsonArray;
    }


    @PostMapping("/updateAppliacationStatus")
    public JSONObject updateAppliacationStatus(int statu,int answer,int task_index) throws Exception {

        JSONObject jsonObject = new JSONObject();
        String sql = "update task_log_for_application set task_status = "+statu+",task_audit_answer = "+answer+" where task_index = "+task_index+"";
        DataBaseOP.requestNoReturn(sql);

        jsonObject.put("staus","success");

        return  jsonObject;
    }

}
