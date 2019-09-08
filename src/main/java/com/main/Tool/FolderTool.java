package com.main.Tool;

import org.omg.Messaging.SYNC_WITH_TRANSPORT;
import org.springframework.util.ClassUtils;
import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import java.io.*;
import java.nio.ByteBuffer;
import java.sql.BatchUpdateException;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

/**
 * 罗继业
 * 2019.8.25
 *
 *
 */
public class FolderTool {



    public static String getOriginPath(){

        String path = ClassUtils.getDefaultClassLoader().getResource("").getPath();

        String originPath = path;


        return path;




    }

    public static  String getImageCollectorPath(){


        return getOriginPath()+"static\\"+"ImageCollector\\";

    }

    /**
     * 获取ImageCollector文件夹下面的子目录
     * @param path
     * @return
     */
    public static String getImageCollectorSubPath(String path){


        return  getImageCollectorPath()+path;

    }

    public static  void createFolder(String path){

       File file = new File(path);
       file.mkdir();



       Debug.Log(file.getAbsolutePath());

    }

    /**
     * 删除文件夹
     * @param originPath
     * @param folderName
     */
    public static  void deleteFolder(String originPath,String folderName){

        File file = new File(originPath+"\\"+folderName);

        if (file.exists() == true)
        {

            file.delete();
            Debug.Log("删除成功！");

        }else {

            Debug.Log("删除失败！");
        }


    }


    public static long BytesToLong(byte[] buffer) {
        long  values = 0;
        for (int i = 0; i < 8; i++) {
            values <<= 8; values|= (buffer[i] & 0xff);
        }
        return values;
    }

    public static byte[] longToBytes(long x) {

        Debug.Log("转换！");
        ByteBuffer buffer = ByteBuffer.allocate(Long.BYTES);
        buffer.putLong(x);
        return buffer.array();
    }

    /**
     * 将文件以二进制流的形式组成新的集合
     * @param folderPath
     * @param name
     * @return
     * @throws IOException
     */
    public static File madeTrainGroup(String folderPath,String name) throws IOException, ParserConfigurationException, SAXException {
        File file = new File(folderPath+"\\"+name);

        if (file.exists() == false){

            file.createNewFile();
        }else {
            file.delete();
            file.createNewFile();


        }

        long configFileLenth = 0;
        Debug.Log(folderPath);
        List<String> tempList = traverseFolderForFile(folderPath);
        FileOutputStream fileos = new FileOutputStream(folderPath+"\\"+name);

        File configFile =  new File(folderPath+"\\Config.xml");
        configFileLenth = configFile.length();

        byte[] configFileLenBuffer = longToBytes(configFileLenth);

        Debug.Log(configFile.length()+"");
    //  for (byte b : configFileLenBuffer
    //       ) {

    //      Debug.Log("打包长度："+b());

    //  }
        fileos.write(configFileLenBuffer);
        FileInputStream configIS = new FileInputStream(configFile);
        byte[] configBytes = new byte[1024];
        int configLen = 0;

        while((configLen=configIS.read(configBytes))!=-1){
            fileos.write(configBytes, 0, configLen);

        }
        Debug.Log(folderPath+"\\Config.xml");
        XMLTool tool = new XMLTool(FolderTool.getImageCollectorSubPath("superTask"),"\\Config.xml");


    //F:\JAVAProj\spx\target\classes\static\ImageCollector\superTask
        for (int key1:tool.labelList) {


            for (String key:tempList) {

                if (key.contains(key1+"") == false){
                    Debug.Log("忽略 = "+key1+"<>"+key);
                    continue;

                }
                Debug.Log("当前key = "+key1+"<>"+key);
                Debug.Log(key);
                File tempFile = new File(key);
                FileInputStream fs = new FileInputStream(tempFile);


                byte[] bytes = new byte[1024];
                int len = 0;

                while((len=fs.read(bytes))!=-1){
                    fileos.write(bytes, 0, len);

                }



                fs.close();
            }

        }


        fileos.close();

        //fileos.write();


        return  file;

    }
    /**
     * 遍历文件
     * @param path
     */
    public static List<String> traverseFolderForFile(String path) {

        List<String> tempList = new ArrayList<>();
        int fileNum = 0, folderNum = 0;
        File file = new File(path);
        if (file.exists()) {
            LinkedList<File> list = new LinkedList<File>();
            File[] files = file.listFiles();
            for (File file2 : files) {
                if (file2.isDirectory()) {
                    System.out.println("文件夹:" + file2.getAbsolutePath());
                    list.add(file2);

                } else {

                    tempList.add(file2.getAbsolutePath());

                    fileNum++;
                }
            }
            File temp_file;
            while (!list.isEmpty()) {
                temp_file = list.removeFirst();
                files = temp_file.listFiles();
                for (File file2 : files) {
                    if (file2.isDirectory()) {
                        System.out.println("文件夹:" + file2.getAbsolutePath());
                        list.add(file2);
                        folderNum++;
                    } else {
                        System.out.println("文件:" + file2.getAbsolutePath());
                        fileNum++;
                    }
                }
            }
        } else {
            System.out.println("文件不存在!");
        }

        return  tempList;

    }
}
