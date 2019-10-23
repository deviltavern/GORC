package com.main.activity.signature;


import com.main.Tool.JqueryRequestTool;
import com.main.Tool.folder.FolderTool;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
public class NameSignature {

    public static String  tempPath;
    public static Map<String,String> hashMap = new HashMap<>();
    @PostMapping("/uploadSignature")
    public void uploadSignature(MultipartFile file, String name) throws IOException {

        String fileName = "signature";
        String path = FolderTool.getImageCollectorPath()+fileName+".png";
        file.transferTo(new File(path));
        System.out.println(name+":上传成功！");
        tempPath = path;
        if(hashMap.containsKey(name)){
            hashMap.remove(name);
        }
        hashMap.put(name,"already");


    }

    @PostMapping("/requestSignatureStatus")
    public String requestSignatureStatus(String name){

        if(hashMap.containsKey(name)){
            return hashMap.get(name);
        }
        return "there is no value";
    }

    @PostMapping("/onSignature")
    public void onSignature(String name){

        if(hashMap.containsKey(name)){
            hashMap.remove(name);
        }
        hashMap.put(name,"null");


    }

    @PostMapping("/getSignatureImgPath")
    public String getSignatureImgPath(){


        return  tempPath;
    }

}
