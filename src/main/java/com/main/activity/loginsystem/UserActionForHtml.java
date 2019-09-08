package com.main.activity.loginsystem;


import com.main.DynamicLayer.User;
import com.main.Tool.JqueryRequestTool;
import com.main.dao.DataBaseOP;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@Controller
public class UserActionForHtml {

    public static String randomValue = "456123";


    @GetMapping("/login")
    public String login(String skey){


        if (User.vorify(skey) == true)
        {
            System.out.println("已经登陆，刷新页面！");
            return "hall/homepage.html";
        }

        if(skey.equals(randomValue))
        {

            System.out.println("进入新的页面！");
            String a = "";

            return "hall/homepage.html";
        }else {

            return "login/login_page.html";

        }




    }


    @PostMapping("/register")
    public String reigster( HttpServletRequest request) throws Exception {


        JqueryRequestTool tool = new JqueryRequestTool(request);

        DataBaseOP.requestNoReturn(tool.getInsertSql("user_info",JqueryRequestTool.flushList()));

        System.out.println("欢迎注册");
        return "success";

    }



}
