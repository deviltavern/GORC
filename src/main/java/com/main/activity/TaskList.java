package com.main.activity;



import com.alibaba.fastjson.JSONException;
import com.main.dao.DataBaseOP;
import com.main.Model.TaskModel;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Enumeration;

@RestController
public class TaskList {


    @PostMapping("/requestData")
    public void getData(HttpServletRequest request) throws Exception {

        String value = "{";

        Enumeration enuLen=request.getParameterNames();
        Enumeration enu=request.getParameterNames();

        int num  = 0;
        while(enuLen.hasMoreElements()){
            num++;
            enuLen.nextElement();
        }

        int dynamicNum = 0;

        //insert into task_list(task_master) values('123');
        while(enu.hasMoreElements()){

            dynamicNum++;
            String paraName = "";
            paraName =(String)enu.nextElement();
            if(dynamicNum == (num)){

                value +='"'+paraName+'"'+':'+'"'+request.getParameter(paraName)+'"';

            }else
            {
                value +='"'+paraName+'"'+':'+'"'+request.getParameter(paraName)+'"'+',';

            }
            value =  value.replace("\n", "<br>");


        }
        value+='}';
        System.out.println(value);
        JSONObject jb = JSONObject.fromObject(value);

        System.out.println(jb.toString());

        TaskModel model = (TaskModel)JSONObject.toBean(jb,TaskModel.class);
        String a = getDBInsertStrFromJson(jb,"task_list");

        DataBaseOP.requestNoReturn(DataBaseOP.dbName,a);
        System.out.println(a);

       //JSONObject json = GetRequestJsonUtils.getRequestJsonObject(request);
       //System.out.println(json.toJSONString());
    }

    @PostMapping("/requestDataTest")
    public void getDataTest(HttpServletRequest request) throws Exception {

        String value = "{";

        Enumeration enuLen=request.getParameterNames();
        Enumeration enu=request.getParameterNames();

        JSONObject obj = new JSONObject();

        //insert into task_list(task_master) values('123');
        while(enu.hasMoreElements()){

            CodeList cList = null;
            String paraName = "";
            paraName =(String)enu.nextElement();
            switch (paraName)
            {
                case "task_master_code":
                    cList = new CodeList();

                    obj.put(paraName,cList.InsertNewCode(request.getParameter(paraName)));
                    break;

                case "task_solve_code":
                    cList = new CodeList();

                    obj.put(paraName,cList.InsertNewCode(request.getParameter(paraName)));
                    break;

                    default:
                        obj.put(paraName,request.getParameter(paraName));
                        break;

            }


            System.out.println(paraName+"<>"+request.getParameter(paraName));

        }

        obj.put("task_status","未处理");
        TaskModel model = (TaskModel)JSONObject.toBean(obj,TaskModel.class);
        String a = getDBInsertStrFromJson(obj,"task_list");

        DataBaseOP.requestNoReturn(DataBaseOP.dbName,a);
        //JSONObject json = GetRequestJsonUtils.getRequestJsonObject(request);
        //System.out.println(json.toJSONString());
    }

    @PostMapping("/getTaskModelList")
    public JSONArray getTaskModelList() throws Exception {
        JSONArray arry = DataBaseOP.request(DataBaseOP.dbName,DataBaseOP.sql_task_info_table);


        return arry;

    }
    @GetMapping("/getTaskModelListFromType")
    public JSONObject getTaskModelListFromType(String type) throws Exception {
        JSONArray arry = DataBaseOP.request(DataBaseOP.dbName,"select * from task_list where task_type = '"+type+"'");
        String jsonValue = "{ \"code\":0,\"msg\":\"\",\"count\":"+arry.toString().length()+"\"data\":"+"}";

        JSONObject zhangsan = new JSONObject();
        try {
            //添加
            zhangsan.put("code", 0);
            zhangsan.put("msg", "");
            zhangsan.put("count", arry.toString().length());
            zhangsan.put("data", arry);

            System.out.println(zhangsan.toString());
        } catch (JSONException e) {
            e.printStackTrace();
        }



        return zhangsan;
    }

    @PostMapping("/ChangeTaskInfo")
    public void ChangeTaskInfo(HttpServletRequest request) throws Exception {

        String value = "{";

        Enumeration enuLen=request.getParameterNames();
        Enumeration enu=request.getParameterNames();

        JSONObject obj = new JSONObject();

        obj.put("task_solve_strategy",request.getParameter("task_solve_strategy"));
        obj.put("task_solver",request.getParameter("task_solver"));
        obj.put("task_solve_time",request.getParameter("task_solve_time"));
        CodeList cList = new CodeList();
        obj.put("task_solve_code",cList.InsertNewCode(request.getParameter("task_solve_code")));
//task_status
        obj.put("task_status","已完成");
        //insert into task_list(task_master) values('123');



        String a = getUpdateSqlFromJSONModel("task_list",obj,"task_index = "+request.getParameter("task_index"));
        DataBaseOP.requestNoReturn(DataBaseOP.dbName,a);

    }

    public String getUpdateSqlFromJSONModel(String tableName,JSONObject obj,String limitValue)
    {

        String value = "update "+tableName+" set ";


        int index= 0;


            for(Object str:obj.keySet()) {

            if (index == obj.size() - 1){
                value += str+" = '"+ obj.get(str)+"'";

            }else {

                value += str+" = '"+ obj.get(str)+"',";
            }

            index++;


        }

      //  value += ",task_status "+" = '"+ obj.get("task_status")+"'";

        value += "where "+limitValue;
        System.out.println(value);
        return value;
    }

    @GetMapping("/getTaskModelList2")
    public JSONObject getTaskModelList2() throws Exception {
            JSONArray arry = DataBaseOP.request(DataBaseOP.dbName,DataBaseOP.sql_task_info_table);
            String jsonValue = "{ \"code\":0,\"msg\":\"\",\"count\":"+arry.toString().length()+"\"data\":"+"}";

        JSONObject zhangsan = new JSONObject();
        try {
            //添加
            zhangsan.put("code", 0);
            zhangsan.put("msg", "");
            zhangsan.put("count", arry.toString().length());
            zhangsan.put("data", arry);

            System.out.println(zhangsan.toString());
        } catch (JSONException e) {
            e.printStackTrace();
        }



        return zhangsan;

    }
    public String getDBInsertStrFromJson(JSONObject jb,String table)
    {


        String sqlValue = "insert into "+table+"(";

        int index = 0;
        for(Object str:jb.keySet()){


            str= str.toString().replace("(","##@##");
            str=  str.toString().replace(")","##&##");
            if(index == jb.keySet().size()-1)
            {



                sqlValue+= str+")";

            }else {

                sqlValue+= str+",";
            }



            index++;
        }

        sqlValue+= "values(";
        index = 0;
        for(Object str:jb.keySet()){

            String vv = "";
            if (jb.get(str) .equals(""))
            {
                vv = "none";

            }else {
                vv = jb.get(str).toString();

            }


            if(index == jb.keySet().size()-1)
            {
                sqlValue+= "'"+vv.toString()+"')";


            }else {


                sqlValue+= "'"+vv.toString()+"',";
            }



            index++;
        }
        return sqlValue;
    }

    @PostMapping("/setTaskStatu")
    public String setTaskStatu(String key,String value,String task_solver) throws Exception {

        //
        String sql = "update task_list set task_status ='"+value+"',task_solver='"+task_solver+"' where task_index = " +key;
        DataBaseOP.requestNoReturn(DataBaseOP.dbName,sql);

        System.out.println(sql);

        return "success";
    }
    public static byte[] getRequestPostBytes(HttpServletRequest request)
            throws IOException {
        int contentLength = request.getContentLength();
        if(contentLength<0){
            return null;
        }
        byte buffer[] = new byte[contentLength];
        for (int i = 0; i < contentLength;) {

            int readlen = request.getInputStream().read(buffer, i,
                    contentLength - i);
            if (readlen == -1) {
                break;
            }
            i += readlen;
        }
        return buffer;
    }
}
