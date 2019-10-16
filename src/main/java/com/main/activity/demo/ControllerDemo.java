package com.main.activity.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class ControllerDemo {


    @GetMapping("/main")
    public String returnTest(){

            System.out.println("123");
        return  "/Html/demo/tableDemo/BlackShield.html";
    }
}
