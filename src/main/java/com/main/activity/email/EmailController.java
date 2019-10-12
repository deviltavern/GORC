package com.main.activity.email;

import com.main.Tool.JqueryRequestTool;
import com.main.dao.DataBaseOP;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.web.HttpRequestHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.UUID;

import static com.main.Tool.folder.FolderTool.getOriginPath;

@RestController
public class EmailController {


    public JSONObject getImgName(String uuidStr,String type){

        JSONObject reObj = new JSONObject();



        String originPath = getOriginPath();
        originPath += "/static/Email/EmailImg/"+uuidStr+"."+type;

        reObj.put("abPath",originPath);
        reObj.put("url","static/Email/EmailImg/"+uuidStr+"."+type);
        reObj.put("uuid",uuidStr);
        return reObj;
    }
    public String getTypeFromMultipartFile(MultipartFile file){

        String[] strArray = file.getContentType().split("/");

        return strArray[1].trim();

    }
    @PostMapping("uploadEmailImg")
    public JSONObject uploadEmailImg(MultipartFile imgFile,HttpServletRequest handler) throws Exception {
        JSONObject reObj = new JSONObject();
        JqueryRequestTool.addExcludeKey("imgFile");

        JqueryRequestTool tool = new JqueryRequestTool(handler);

        if (imgFile != null){
            JSONObject path = getImgName(tool.jsonObject.get("email_id").toString(),getTypeFromMultipartFile(imgFile));
            imgFile.transferTo(new File(path.get("abPath").toString()));
            reObj.put("url",path.get("url").toString());
        }else {
            tool.jsonObject.put("email_append_source","none");
        }

        reObj.put("status","success");



        System.out.println(tool.jsonValue);

        String sql =  tool.getInsertSql("email_list");
        DataBaseOP.requestNoReturn(sql);



        return reObj;

    }

    public JSONObject uploadEmailInfo(HttpServletRequest handler){
        JSONObject reObj = new JSONObject();

        reObj.put("status","success");

        JqueryRequestTool tool = new JqueryRequestTool(handler);
        System.out.println(tool.jsonValue);


        return reObj;


    }




}
