package com.main.activity.collectorsystem;


import com.main.Tool.Debug;
import com.main.Tool.FolderTool;
import com.main.Tool.XMLTool;
import org.springframework.util.ClassUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
public class FolderCat {

    /**
     * 创建文件夹
     * @param folderName
     */

    @GetMapping("/addFolder")
    public void addFolder(String folderName) throws Exception {


     //   String path = ClassUtils.getDefaultClassLoader().getResource("").getPath();

        String folderPath  = FolderTool.getImageCollectorSubPath(folderName);
        FolderTool.createFolder(folderPath);
        new XMLTool().createConfigXml(folderPath);

    }


    @GetMapping("/clearFolder")
    public String  clearFolder(String folderName) throws Exception {
        String folderPath  = FolderTool.getImageCollectorSubPath(folderName);
        List<String > fileList = FolderTool.traverseFolderForFile(folderPath);



        for (String key:
             fileList) {
            Debug.Log(key);
            new File(key).delete();

        }

        new XMLTool().createConfigXml(folderPath);

        return "success";
    }




    /**
     * 删除文件夹
     * @param folderName
     */
    @GetMapping("/deleteFolder")
    public void deleteFolder(String folderName){

        FolderTool.deleteFolder(FolderTool.getImageCollectorPath(),folderName);

    }


}
