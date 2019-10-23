package com.main.activity.demo;


import com.main.Tool.JqueryRequestTool;
import com.main.Tool.folder.FolderTool;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import sun.misc.BASE64Decoder;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.security.Key;
import java.util.UUID;

@RestController
public class RequestDemo {


    @PostMapping("/requestDemo")
    public void requestDemo(String key, HttpServletRequest ht){


        System.out.println(key+":"+"requestDemo");
        JqueryRequestTool tool = new JqueryRequestTool(ht);

        System.out.println(tool.jsonValue);

    }

    @PostMapping("/uploadImgDemo")
    public void uploadImgDemo(String key) throws IOException {

        System.out.println(key);
        BASE64Decoder decoder = new BASE64Decoder();
        byte[] b = decoder.decodeBuffer(key);
        for (int i =0;i<b.length;i++){
            if(b[i]<0){
                b[i]+= 256;
            }
        }
        FileOutputStream os = new FileOutputStream(FolderTool.getImageCollectorPath()+UUID.randomUUID().toString()+".png");
        os.write(b);
        os.flush();
        os.close();

    }

    @PostMapping("/uploadImgDemo2")
    public void uploadImgDemo2(MultipartFile file) throws IOException {

      file.transferTo(new File(FolderTool.getImageCollectorPath()+UUID.randomUUID().toString()+".png"));

    }
}
