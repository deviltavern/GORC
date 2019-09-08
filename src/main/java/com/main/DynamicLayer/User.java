package com.main.DynamicLayer;

import java.util.Date;
import java.util.HashMap;

public class User {


    public static HashMap<String,User> loginUserMap = new HashMap<>();

    public static HashMap<String,String> loginUserMapByUserAcc = new HashMap<>();
    public String user_acc;
    public  String user_pwd;
    public  String randomValue;
    public Date loginTime;

    public  void  add2loginUserMapByUserAcc(String userAcc,String randomValx)
    {

        if (loginUserMapByUserAcc.containsKey(userAcc))
        {

            loginUserMapByUserAcc.remove(userAcc);

        }else {
            loginUserMapByUserAcc.put(userAcc,randomValx);

        }
    }
    public User(String randomValue,String _user_acc,String _user_pwd){

        this.randomValue = randomValue;
        this.user_acc = _user_acc;
        this.user_pwd = _user_pwd;
        loginUserMap.put(randomValue,this);
        this.loginTime = new Date();
        add2loginUserMapByUserAcc(_user_acc,randomValue);


    }


    public static void butcher(Date now){

        for (User ul :loginUserMap.values()
             ) {

            ul.KilledByTimeDog(now);
        }



    }
    public void KilledByTimeDog(Date now){

        int d2 = Math.abs((int)(loginTime.getTime() - now.getTime()))/1000;



        if (d2>100)
        {

            loginUserMap.remove(this.randomValue);
        }


    }

    public static boolean vorify(String m_sky)
    {
        for (String key:
             loginUserMap.keySet()) {

            if (m_sky.equals(key))
            {

                return true;
            }
        }
            return  false;
    }
    public boolean vorifyInUser(String _acc,String pwd)
    {


        if(pwd.equals(user_pwd))
        {

            return true;
        }else {

            return false;
        }

    }



}
