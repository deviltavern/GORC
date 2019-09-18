package com.main.activity.CodeCollector;

import com.main.dao.DataBaseOP;
import net.sf.json.JSONObject;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.UUID;

public class DBOption {
    /**
     * @description: 插入文件名
     * @return:
     */
    @PostMapping("/InsertCodeFile")
    public String FileNameAdd(String Qname,String fileName) throws Exception {

        DataBaseOP.requestNoReturn(DataBaseOP.dbName,
                "insert into code_collector(question_name,solution_name) values('"+Qname+"','"+"','"+fileName+"')");


        return fileName;
    }
}
