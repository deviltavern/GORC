package com.main.activity.logsystem;


import com.main.Model.TaskModel;
import com.main.Tool.JqueryRequestTool;
import com.main.dao.DataBaseOP;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.xml.crypto.Data;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;

@RestController
public class LogSystem {



    @PostMapping("/receiveLogValue")
    public void receiveLogValue(
            HttpServletRequest request
    ) throws Exception {

        JqueryRequestTool tool = new JqueryRequestTool(request);

        JqueryRequestTool.addExcludeKey("push_index");

        DataBaseOP.requestNoReturn(tool.getInsertSql("task_log",JqueryRequestTool.flushList()));


        System.out.println(new JqueryRequestTool(request).jsonValue);


    }

    @PostMapping("/getLog")

    public JSONArray getLog() throws Exception {

        return DataBaseOP.request("select * from task_log");

    }

}
