package com.main.activity;

import com.google.common.net.InetAddresses;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.net.InetSocketAddress;

@Controller
public class TaskSystem {

    @GetMapping("/dttsystem")

    public String intoSystem(){


        return "login/login3.html";

    }


}
