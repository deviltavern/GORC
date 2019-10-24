package com.main.activity.signature;


import com.main.Tool.JqueryRequestTool;
import com.main.Tool.folder.FolderTool;
import net.sf.json.JSONObject;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import sun.misc.BASE64Decoder;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileOutputStream;
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
    public void onSignature(String name,int code){

        if(hashMap.containsKey(name) ==false){
            hashMap.put(name,new SignatureObject());
        }


        hashMap.get(name).id = name;
        hashMap.get(name).status = code;
        System.out.println("onSignature" + hashMap.get(name).toString());


    }

    @PostMapping("/getSignatureImgPath")
    public String getSignatureImgPath(){


        return  tempPath;
    }

    /**
     *
     * @param key
     * @param opName
     * @param code
     * 0-甲方签字，存储甲方签字后的路径
     * 1-乙方签字，存储乙方签字后的路径
     * @throws IOException
     */
    @PostMapping("/uploadSignatureHTImg")
    public void uploadSignatureHTImg(String key,String opName,int code) throws IOException {

        SignatureObject sg = hashMap.get(opName);


        BASE64Decoder decoder = new BASE64Decoder();
        byte[] b = decoder.decodeBuffer(key);
        for (int i =0;i<b.length;i++){
            if(b[i]<0){
                b[i]+= 256;
            }
        }
        String fileName = UUID.randomUUID().toString()+".png";
        FileOutputStream os = new FileOutputStream(FolderTool.getImageCollectorPath()+fileName);

        switch (code){
            case 0:
                sg.path1 =fileName;
                break;

            case 1:
                sg.path2 = fileName;
                break;

        }
        os.write(b);
        os.flush();
        os.close();

    }

}
