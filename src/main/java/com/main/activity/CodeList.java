package com.main.activity;


import com.main.dao.DataBaseOP;
import net.sf.json.JSONObject;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
public class CodeList {

@PostMapping("/InsertNewCode")
    public String InsertNewCode(String value) throws Exception {

        UUID key = UUID.randomUUID();
        value = value.replace("'","@@#@@");
        String randomKey =  key.toString();

        DataBaseOP.requestNoReturn(DataBaseOP.dbName,"insert into code_list(code_id,code_value) values('"+
                randomKey+"','"+value+"')");


        return randomKey;

    }

    @PostMapping("/getCodeFromDB")
    public JSONObject getCode(String id) throws Exception {


    String value = DataBaseOP.select("code_list","code_id","'"+id+"'");

    System.out.println(value);
       return DataBaseOP.requestSingle(DataBaseOP.dbName, value);



    }
}
