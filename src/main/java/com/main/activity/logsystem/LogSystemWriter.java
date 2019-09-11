package com.main.activity.logsystem;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LogSystemWriter {


    @GetMapping("/write_log")
    public void  writer(){

        System.out.println("writelog");

    }
}
