package com.main.activity.deeplearning;


import com.main.Tool.JqueryRequestTool;
import com.main.Tool.TimeTool;
import com.main.dao.DataBaseOP;
import net.sf.json.JSONArray;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
public class TrainTask {


    @GetMapping("/getTrainDate")
    public String getTrainDate() throws Exception {

        String data = new TimeTool().getNow();
        String sql = "insert into train_log(train_time) values('"+data+"')";

        DataBaseOP.requestNoReturn(sql);
        return data;


    }

    @GetMapping("/getTrainDateList")
    public JSONArray getTrainDateList() throws Exception {
        String sql = "select * from train_log";

        JSONArray jsonArray = DataBaseOP.request(sql);

        return  jsonArray;

    }

    @PostMapping("/getTrainInfo")
    public JSONArray getTrainInfo(String trainDate) throws Exception {
        String sql = "select * from train_info where task_id = '"+trainDate+"'";


        JSONArray jsonArray = DataBaseOP.request(sql);

        return jsonArray;


    }


    @PostMapping("/setTrainInfo")

    public void setTrainInfo(HttpServletRequest request) throws Exception {

        JqueryRequestTool tool = new JqueryRequestTool(request);
        String sql = tool.getInsertSql("train_info");

        DataBaseOP.requestNoReturn(sql);


    }
}
