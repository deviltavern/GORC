package com.main.activity.loginsystem;

import com.main.activity.chat.Chat;
import com.main.activity.info.XInfo;
import io.swagger.annotations.Info;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class LoginUser {
   public String user_acc;

   public static Map<String, Chat> p2pMap = new HashMap<>();

   /**
    * 通过friendID去查找到是否存在该房间
    * @return
    *遍历所有房间，发现这个房间里面同时包含你和我，然后就返回这个房间。
    *通常情况下这个房间时唯一的。
    *
    * 做了一些奇怪的修改！
    * 做了一些奇怪的修改2
    */

   public XInfo findChatByFrindID(String friendID,String myself){
      XInfo info = new XInfo();
      int number = 0;
      for (String key :
              p2pMap.keySet()) {

         Chat chat = p2pMap.get(key);
         for (String userAcc: chat.userList
              ) {

            if (userAcc.equals(friendID)){

               number++;

            }

            if (userAcc.equals(myself)){

               number++;
            }

            if(number >=2){

               info.code = 100;
               info.arg1 = chat.chatID;
               return info;

            }
         }

         
      }
      info.code = 200;

      return info;

   }

   public static void storeChatInP2PMap(String chatID,Chat chat){
      if (p2pMap.containsKey(chatID) == false){

         p2pMap.put(chatID,chat);
      }

   }

   public void addMessage(String value){


   }

}
