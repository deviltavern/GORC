package com.main.activity.ip;

import com.sun.org.apache.bcel.internal.generic.RET;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.UnknownHostException;

@RestController
public class IPEvent {

    @GetMapping("/getServerIP")
    public String getIP() throws UnknownHostException {


        String ip = InetAddress.getLocalHost().getHostAddress();

     return ip;
    }
}
