package com.main.activity.chat;

import java.util.*;

public class Chat {

    Map<String,String> chatMap = new HashMap<>();

    //该房间里面所有的成员
    public List<String> userList = new ArrayList<>();
    public String chatID;
    public List<String> chatMessageList = new ArrayList<>();

    public  Chat(String key){


        this.chatID = key;

    }
    public  Chat(){

        UUID uuid =UUID.randomUUID();
        this.chatID = uuid.toString();

    }

    public void  addUser(String user_acc){

        userList.add(user_acc);

    }

    public String getMessage(){

        String key = "";

        for (String ke:chatMessageList
             ) {

            key += ke+"&";

        }
        return  key;
    }

    public String addMessage(String user_acc,String message){
        //从数据库里面读取用户名

        chatMessageList.add(user_acc+":"+message);


        return "";

    }

}
