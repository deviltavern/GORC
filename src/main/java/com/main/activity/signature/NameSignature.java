package com.main.activity.signature;


import com.main.Tool.JqueryRequestTool;
import com.main.Tool.folder.FolderTool;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.UUID;

@RestController
public class NameSignature {

    public static String  tempPath;

    @PostMapping("/uploadSignature")
    public void uploadSignature(MultipartFile file, HttpServletRequest hp) throws IOException {

        String fileName = "signature";
        String path = FolderTool.getImageCollectorPath()+fileName+".png";
        file.transferTo(new File(path));
        System.out.println("上传成功！");
        tempPath = path;

        System.out.println(hp.getParameter("file"));

    }

    @PostMapping("/getSignatureImgPath")
    public String getSignatureImgPath(){


        return  tempPath;
    }

}
