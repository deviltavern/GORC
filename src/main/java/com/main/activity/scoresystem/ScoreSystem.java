package com.main.activity.scoresystem;

import com.main.Tool.JqueryRequestTool;
import com.main.dao.DataBaseOP;
import com.sun.org.apache.bcel.internal.generic.ACONST_NULL;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.http.HttpRequest;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * Create by fan on 2019/9/14
 */
@RestController
public class ScoreSystem {

    @PostMapping("/scoreShow")
    public JSONObject scoreShow(String user_acc) throws Exception {

        //System.out.println("scoreShow:" + user_acc);
        String sql_ScoreShowByUser_acc = "select user_gold from user_info where user_acc='123'";

        JSONArray tempjr = DataBaseOP.request(sql_ScoreShowByUser_acc);
        //System.out.println(tempjr.getJSONObject(0));
        return tempjr.getJSONObject(0);
    }

    @PostMapping("/receiveScoreValue")
    public void receiveScoreValue(
            HttpServletRequest request
    ) throws Exception {

        JqueryRequestTool tool = new JqueryRequestTool(request);
        System.out.println(tool.jsonValue);
        JqueryRequestTool.addExcludeKey("user_name");

        DataBaseOP.requestNoReturn(tool.getInsertSql("task_log", JqueryRequestTool.flushList()));


    }
}
