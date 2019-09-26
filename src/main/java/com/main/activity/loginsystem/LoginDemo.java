package com.main.activity.loginsystem;


import net.sf.json.JSON;
import net.sf.json.JSONObject;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginDemo {



    @PostMapping("/loginDemo")
    public JSONObject getData(){

        JSONObject obj = new JSONObject();

        obj.put("index",1);
        obj.put("width",200);

        return obj;

    }
}
