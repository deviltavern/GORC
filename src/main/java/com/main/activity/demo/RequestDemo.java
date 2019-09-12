package com.main.activity.demo;


import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RequestDemo {


    @PostMapping("/requestDemo")
    public void requestDemo(){

        System.out.println("requestDemo");

    }
}
