package com.main.activity;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TaskSystem {

    @GetMapping("/dttsystem")

    public String intoSystem(){


        return "login/login_page.html";

    }
}
