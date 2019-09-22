package com.main.activity.ip;

import com.sun.org.apache.bcel.internal.generic.RET;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.*;
import java.util.Enumeration;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
public class IPEvent {

    @GetMapping("/getServerIP")
    public String getIP() throws UnknownHostException {


        String ip = InetAddress.getLocalHost().getHostAddress();

     return getV4IP();
    }

    public static String getV4IP() {
        String ip = "";
        String chinaz = "http://ip.chinaz.com/";

        String inputLine = "";
        String read = "";
        try {
            URL url = new URL(chinaz);
            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
            BufferedReader in = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
            while ((read = in.readLine()) != null) {
                inputLine += read;
            }
            System.out.println(inputLine);

        } catch (Exception e) {
            e.printStackTrace();
        }

        Pattern p = Pattern.compile("\\<strong class\\=\"red\">(.*?)\\<\\/strong>");
        Matcher m = p.matcher(inputLine);
        if(m.find()){
            String ipstr = m.group(1);
            System.out.println(ipstr);
        }
        return ip;
    }



}






