package com.main.activity.scoresystem;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 陈一2019.8,26
 */

@RestController
public class ScoreAction {


    /**
     * 当发布的任务完成时，然后甲方验收完毕后，发起确认请求
     *
     *
     */
    @GetMapping("/systemConfirmScore")
    public String systemConfirmScore(int score){

        //数据库

        //返回信息

        return "success";


    }




}
