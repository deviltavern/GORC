package com.main.activity.collectorsystem;


import com.main.Tool.Debug;
import com.main.Tool.FolderTool;
import com.main.Tool.XMLTool;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.xml.sax.SAXException;

import javax.servlet.http.HttpServletResponse   ;
import javax.xml.parsers.ParserConfigurationException;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.UUID;

@RestController
public class ImageCollector {


    @PostMapping("/image_upload")
    public String imageUpload(String folderName,MultipartFile file,int type) throws Exception {


        UUID uuid = UUID.randomUUID();

        if (file==null)
        {

            Debug.Log("文件为空");
        }else {



            XMLTool xmlTool = new XMLTool(FolderTool.getImageCollectorSubPath(folderName+"\\"),"Config.xml");

            int index = xmlTool.labelListNode.getChildNodes().getLength();
            file.transferTo(new File(FolderTool.getImageCollectorSubPath(folderName+"\\")+index+".bmp"));

            xmlTool.addNewImage(type,index+"");

            Debug.Log("数据接收完毕！");
        }


        return  "success";

    }



    @GetMapping("/trainGroup.xmb")
    public void createTrainGroup(String folderName, HttpServletResponse request) throws IOException, ParserConfigurationException, SAXException {

       // FolderTool.traverseFolder(FolderTool.getImageCollectorSubPath("CircleFolder"));
        Debug.Log("打包开始！");
        File fl =  FolderTool.madeTrainGroup(FolderTool.getImageCollectorSubPath(folderName),"trainGroup.xmb");


        byte[] tempBuffer = new byte[1024];
        int len = 0;

        FileInputStream fis = new FileInputStream(fl);

        int sum = 0;
        while ((len=fis.read(tempBuffer))!= -1 ){

            request.getOutputStream().write(tempBuffer,0,len);
            sum++;
        }

        Debug.Log(sum+"");
        fis.close();
        request.getOutputStream().close();

        Debug.Log("打包成功！");


    }

    @GetMapping("/createTrainGroupNoResponse")
    public String createTrainGroupNoResponse(String folderName, HttpServletResponse request) throws IOException, ParserConfigurationException, SAXException {

        // FolderTool.traverseFolder(FolderTool.getImageCollectorSubPath("CircleFolder"));
        Debug.Log("打包开始！");
        File fl =  FolderTool.madeTrainGroup(FolderTool.getImageCollectorSubPath(folderName),"trainGroup.xmb");



        Debug.Log("打包成功！");

        return FolderTool.getImageCollectorSubPath(folderName+"\\")+"trainGroup.xmb";
    }
    @GetMapping("/inserNewImage")
    public void inserNewImage(String folderName) throws Exception {

        // FolderTool.traverseFolder(FolderTool.getImageCollectorSubPath("CircleFolder"));


    }

}
