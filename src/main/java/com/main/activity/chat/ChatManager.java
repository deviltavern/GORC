package com.main.activity.chat;

import com.main.Tool.JqueryRequestTool;
import com.main.activity.info.XInfo;
import com.main.activity.loginsystem.LoginUser;
import com.main.activity.loginsystem.UserActionForData;
import com.main.activity.loginsystem.UserActionForHtml;
import org.omg.CORBA.PUBLIC_MEMBER;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
public class ChatManager {

    public static Map<String,Chat> chatMap = new HashMap<>();


    public static String  createChat(String key){
        Chat chat = new Chat(key);

        chatMap.put(chat.chatID,chat);

        return chat.chatID;
    }
    public static Chat  createChat(){
        Chat chat = new Chat();

        chatMap.put(chat.chatID,chat);

        return chat;
    }
    public static Map<String,String> callMap = new HashMap<>();



    /**
     * 0->返回失败
     * @param chatUser
     * @param key
     * @return
     */
    public int  chatAddUser(String chatUser,String key){
        if (chatMap.containsKey(chatUser) == true)
        {
            //chatMap.get(chatUser).

            return 100;

        }
        else {

            return 0;
        }



    }


    //9527
    //callMap.put(9527,"123");
    //9527->login<-房间号

    //

    /**
     *用户创建房间，先搜索针对用户的房间是否存在，房间创建完毕之后呢，，用户信息就会缓存到该房间中
     * @param
     * @return
     */
    @GetMapping("/initChat")
    public ChatRevalue initChat(HttpServletRequest request) {
        //主要上传两个参数
        //user_acc
        //user_friend

        ChatRevalue rchat = new ChatRevalue();

        JqueryRequestTool tool = new JqueryRequestTool(request);

        String user_acc = tool.jsonObject.get("user_acc").toString();
        String user_friend = tool.jsonObject.get("user_friend").toString();
        LoginUser freind_user = UserActionForData.loginUserMap.get(user_friend);

        LoginUser master_user = UserActionForData.loginUserMap.get(user_acc);
        XInfo info = master_user.findChatByFrindID(user_friend,user_acc);
        //说明是失败的
        if(info.code == 200){
            Chat cht = createChat();
            rchat.code = 200;

            cht.addUser(user_friend);
            cht.addUser(user_acc);
            LoginUser.storeChatInP2PMap(cht.chatID,cht);

            rchat.reValue = cht.chatID;
        }
        //说明是成功的
        if(info.code == 100) {
            rchat.code = 100;

            rchat.reValue = info.arg1;
        }




        return rchat;



    }

    @GetMapping("/onreceive")
    public String onReceive( HttpServletRequest request){
        JqueryRequestTool tool = new JqueryRequestTool(request);

        System.out.println(tool.jsonObject.toString());
        Chat chatID = null;


        chatID =  LoginUser.p2pMap.get(tool.jsonObject.get("chat_id").toString());

        chatID.addMessage(tool.jsonObject.get("user_acc").toString(),tool.jsonObject.get("message").toString());

        return chatID.getMessage();

    }
}
