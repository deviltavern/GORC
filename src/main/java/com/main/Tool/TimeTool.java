package com.main.Tool;

import java.text.SimpleDateFormat;
import java.util.Date;

public class TimeTool {

    public String getNow(){
        Date date = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return sdf.format(date);
    }
}
