package com.main.activity.demo;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import sun.misc.BASE64Decoder;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.UUID;

/**
 * @author ：
 * @description: TODO
 * @date ：2019/10/10 19:53
 */
@RestController
public class SignatureDemo {
    @PostMapping("/SignatureSave")
    public String SignatureSave(String imgStr) throws IOException {
        //使用uuid保证每次保存的图片名称唯一
        UUID uuid =UUID.randomUUID();
        //Base64解码，生成.png图片
        BASE64Decoder decoder = new BASE64Decoder();
        byte[] decoderBytes = decoder.decodeBuffer(imgStr);
        FileOutputStream out = new FileOutputStream(new File("E:/Desktop/Signature/"+uuid+".png"));
        out.write(decoderBytes);
        out.close();

        System.out.println(uuid);
        return "success";
    }
}
