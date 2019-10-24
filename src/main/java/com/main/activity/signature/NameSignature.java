package com.main.activity.signature;


import com.main.Tool.JqueryRequestTool;
import com.main.Tool.folder.FolderTool;
import net.sf.json.JSONObject;
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
    public static Map<String,SignatureObject> hashMap = new HashMap<>();
    @PostMapping("/uploadSignature")
    public String  uploadSignature(MultipartFile file, String name) throws IOException {

        String fileName = "signature";
        String path = FolderTool.getImageCollectorPath() + fileName + ".png";
        file.transferTo(new File(path));
        System.out.println(name + ":上传成功！");
        tempPath = path;
        if (hashMap.containsKey(name)) {
            hashMap.get(name).status = 1;
            hashMap.get(name).path1 = fileName + ".png";
            return "success";
        }

        return "failed";

    }




    @PostMapping("/requestSignatureStatus")
    public JSONObject requestSignatureStatus(String name){


        if(hashMap.containsKey(name) == true) {
            return JSONObject.fromObject(hashMap.get(name));
        }

        return null;
    }

    @PostMapping("/onSignature")
    public void onSignature(String name){

        if(hashMap.containsKey(name)){
            hashMap.remove(name);
        }

        hashMap.put(name,new SignatureObject());
        hashMap.get(name).id = name;
        hashMap.get(name).status = 0;
        System.out.println("onSignature" + hashMap.get(name).toString());


    }

    @PostMapping("/getSignatureImgPath")
    public String getSignatureImgPath(){


        return  tempPath;
    }

}
