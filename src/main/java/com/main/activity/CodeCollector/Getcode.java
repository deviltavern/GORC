package com.main.activity.CodeCollector;

import com.main.Tool.JqueryRequestTool;
import com.main.dao.DataBaseOP;
import net.sf.json.JSONObject;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.Enumeration;
import java.util.UUID;

import static com.main.Tool.folder.FolderTool.getCodePath;
import static com.main.Tool.folder.FolderTool.getOriginPath;

@RestController
public class Getcode {

   public  String QuestionName;
    public  String QuestionId;
    public  String UserName;
    public  String UserId;
    public  String SolutionAdd;
    public  String SolutionCode;
    public byte[] Codebytes;
    @PostMapping("/code_collector")
    public JSONObject collector(HttpServletRequest request) throws Exception {
//拿到json数据

        JSONObject reObj = new JSONObject();
        JqueryRequestTool tool = new JqueryRequestTool(request);

        Enumeration enu=request.getParameterNames();
//        while(enu.hasMoreElements()){
//            String name=(String)enu.nextElement();//得到name的名字。
//            if(name.equals("auxiliary")){
//                System.out.print("属性"+name);
//                SolutionAdd=request.getParameter(name);//是通过页面中的name属性得到值。
//                System.out.println(",值："+SolutionAdd);
//            }
//        }
      //  通过页面属性name的属性得到值：request1.getParameter(name);即可。
        System.out.println(",值："+request.getParameter("code"));
        UserId=request.getParameter("user_acc");
        UserName=request.getParameter("user_name");
        QuestionName=request.getParameter("title");
        QuestionId=request.getParameter("titleID");
        SolutionAdd=request.getParameter("auxiliary");
        SolutionCode=request.getParameter("code");
        UUID id = UUID.randomUUID();
        //JqueryRequestTool.addExcludeKey("push_index");

        //DataBaseOP.requestNoReturn(tool.getInsertSql("task_log",JqueryRequestTool.flushList()));

//打印出来要存入的文件地址
        String path= getOriginPath()+"static/CodeCollect/";
        String infactPath=path+id.toString()+"streamfile.ctg";
        String insertPath=id.toString()+"streamfile.ctg";
        System.out.println(path);
//打印拿到json数据
        System.out.println(tool.jsonValue.toString());

//写入服务器的文件夹中
        WriteToFile(tool.jsonValue.toString(),infactPath);

//写入数据库，
        FileNameAdd(UserId,UserName,QuestionId,QuestionName,SolutionAdd,insertPath);

//拿到文件的比特流
        Codebytes= readFromCTG(infactPath);
//解析比特流
        readCode(Codebytes);

        reObj.put("rest_value",insertPath);
        reObj.put("rest_filename",insertPath);
        return reObj;

    }


    public  static String FileNameAdd(String user_acc,String user_name,String title_id,String title,String auxiliary,String filePath) throws Exception {

        DataBaseOP.requestNoReturn(DataBaseOP.dbName,
                "insert into code_collector(user_acc,user_name,question_id,question_name,solution_add,solution_name) " +
                        "values('"+ user_acc+"','"+ user_name+"','"+ title_id+"','"+ title+"','"+ auxiliary+"','"+filePath+"')");

        return filePath;
    }



//拿到比特流

    public byte[] readFromCTG(String path) throws IOException {
        //
        File file = new File(path);
        FileInputStream fis = new FileInputStream(file);
        byte[] CacheBytes = new byte[(int)file.length()];
        byte bytes[]=new byte[1024];
        int temp=0;      //边读边写
        int len = 0;
        int dynamic = 0;
        System.out.println("文件大小："+CacheBytes.length);
        while ((temp=fis.read(bytes))!=-1){//读
            for ( int i =0;i<1024;i++){

                if (dynamic>=CacheBytes.length)
                    break;
                CacheBytes[dynamic] = bytes[i];
                dynamic++;
            }
            len++;
        }
        return CacheBytes;
    }





    //写入文件
    public void WriteToFile(String str,String pathTo) throws IOException {

        File file = new File( pathTo);
        FileWriter fw = null;
        BufferedWriter bw = null;
        try {
            fw = new FileWriter(file);
            bw = new BufferedWriter(fw);
            bw.write(str);
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } finally{
            try {
                bw.close();
                fw.close();
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }

        }

    }
    //写入文件
    public static void getBufferFile (String pathForm,String pathTo)throws IOException {
        File file=new File(pathForm);
        if(!file.isFile()){   return;   }
        BufferedInputStream bfis=new BufferedInputStream(new FileInputStream(file));
        BufferedOutputStream  bfos=new BufferedOutputStream(new FileOutputStream(pathTo));//copy到src目录下
        byte bytes[]=new byte[1024];
        int temp=0;      //边读边写
        while ((temp=bfis.read(bytes))!=-1){//读
            bfos.write(bytes,0,temp);   //写
        }
        bfos.flush();
        bfos.close();
        bfis.close();
        System.out.println("写入成功！");
    }
//解析文件
    public static void ReadFile(String pathFrom)throws Exception{
           File file = new File(pathFrom);
            FileInputStream fis = new FileInputStream(file);
            byte[] CacheBytes = new byte[(int)file.length()];
            byte bytes[]=new byte[1024];
            int temp=0;      //边读边写

            int len = 0;
            int dynamic = 0;
            System.out.println("文件大小："+CacheBytes.length);

            while ((temp=fis.read(bytes))!=-1){//读


                for ( int i =0;i<1024;i++){

                    if (dynamic>=CacheBytes.length)
                        break;
                    CacheBytes[dynamic] = bytes[i];
                    dynamic++;
                }
                len++;
            }
            String stb = new String(CacheBytes, StandardCharsets.UTF_8);
            System.out.println(stb);
        }

    public static String readCode(byte[] codeByte)throws Exception{

        String stb = new String(codeByte, StandardCharsets.UTF_8);
        System.out.println(stb);
        return stb;
    }


    }


