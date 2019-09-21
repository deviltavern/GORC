package com.main.activity.matrixsystem;


import com.main.Tool.math.XMatrix;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.UUID;

@RestController
public class MatrixSystem {

    public static HashMap<String, XMatrix> matrixMap = new HashMap<>();



    @PostMapping("/connect_for_matrix")
    public String onConnect(){

        UUID uuid = UUID.randomUUID();

        String id =uuid.toString();
        matrixMap.put(id,new XMatrix());

        return id;
    }

    @PostMapping("/matrix_init")
    public int createOrigin(
            String matrixID,
            int width,
            int height,
            int type

    ){
        XMatrix matrix = matrixMap.get(matrixID);

        matrix.setMatrix(width,height,type);

        return  type;
    }

    @PostMapping("/matrix_set_data")
    public String matrixSetData(
            String matrixID,
            String value,
            int type

    ){
        XMatrix matrix = matrixMap.get(matrixID);


        matrix.setData(value,type);
        return matrix.toString();
    }
    @PostMapping("/matrix_inverse")
    public String inverse(String matrixID){
        XMatrix matrix = matrixMap.get(matrixID);
        matrix.inverse();
        return matrix.toString();

    }


    @PostMapping("/matrix_mul")
    public String mul(String matrixID){
        XMatrix matrix = matrixMap.get(matrixID);
        matrix.mul();
        return matrix.toString();

    }




}
