package com.main.Tool;

import com.main.DynamicLayer.User;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.logging.Logger;

@Component
public class TimeDog {



    @Scheduled(fixedRate = 10000)
    public void reportCurrent(){
        User.butcher(new Date());
    }
}
