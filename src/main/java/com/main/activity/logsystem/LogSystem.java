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
        //插入数据
        JqueryRequestTool.addExcludeKey("push_index");
        DataBaseOP.requestNoReturn(tool.getInsertSql("task_log",JqueryRequestTool.flushList()));
        System.out.println(new JqueryRequestTool(request).jsonValue);

        //将发布日志数据插入数据库后，判断该作者当天发布日志数量是否超过10篇
        //查询数据库中发布日期为当前日期的日志数量
        //查询语句格式：select count(*) from task_log WHERE push_master='lwx' and task_begin_time='2019-09-05'

        //从前端传来数据获取当天日期
        String current_date=request.getParameter("task_begin_time");
        //获取作者
        String author=request.getParameter("push_master");

        String sql="select count(*) from task_log WHERE push_master='"+author+"' and task_begin_time='"+current_date+"'";
        JSONObject log_count_obj= (JSONObject) DataBaseOP.request(sql).get(0);
        int log_count= Integer.parseInt(log_count_obj.getString(""));
        System.out.println(log_count);

        //判断是否超过10篇
        if(log_count>10)
            //不加积分
            System.out.println("不加积分");
        else
            //加积分
            System.out.println("加积分");
    }

    @PostMapping("/getLog")

    public JSONArray getLog() throws Exception {

        return DataBaseOP.request("select * from task_log");

    }
    //    模糊查询sql语句
    //    select * from task_log where concat([describe],solve_strategy,push_master,type,sub_type) like '%html%'
    @PostMapping("/SearchLog")
    public JSONArray SearchLog( HttpServletRequest request)throws Exception{
        //获取参数，搜索关键词
        String searchword=request.getParameter("keyword");
        System.out.println(searchword);
        String sql="select * from task_log where concat([describe],solve_strategy,push_master,type,sub_type) like '%"+searchword+"%'";
        return DataBaseOP.request(sql);
    }

}
