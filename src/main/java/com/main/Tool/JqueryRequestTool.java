package com.main.Tool;

import net.sf.json.JSONObject;
import org.springframework.web.context.support.HttpRequestHandlerServlet;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;

public class JqueryRequestTool {


    public static List<String> excludeList = new ArrayList<>();

    public static void addExcludeKey(String key){

        excludeList.add(key);

    }

    public static List<String> flushList(){
        List<String >tempList = new ArrayList<>();

        for (String key:
             excludeList) {
            tempList.add(key);

        }
        excludeList.clear();

        return tempList;



    }
    public String jsonValue;
    public JSONObject jsonObject;
    public JqueryRequestTool(JSONObject inputJSON){

        this.jsonObject = inputJSON;
        this.jsonValue = inputJSON.toString();

    }

    public JqueryRequestTool(HttpServletRequest request){

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

        JSONObject jb = JSONObject.fromObject(value);
        this.jsonObject = jb;
        jsonValue = value;

    }
    public String getInsertSql(String table)
    {
        JSONObject jb = this.jsonObject;
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

    public String getInsertSql(String table, List<String> excludeList)
    {
        JSONObject jb = this.jsonObject;
        String sqlValue = "insert into "+table+"(";

        int index = 0;
        for(Object str:jb.keySet()){

            boolean isKey = false;
            for (String k2 : excludeList){

                if (str.toString().equals(k2))
                {
                    isKey = true;
                }


            }
            if(isKey == true)
            {
                continue;

            }

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




}
