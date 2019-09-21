package com.main.Tool.math;

import org.omg.CORBA.PUBLIC_MEMBER;
import org.ujmp.core.DenseMatrix;
import org.ujmp.core.Matrix;

public class XMatrix  {


    Matrix originMatrix;
    Matrix releventMatrix;
    int height;
    int width;
    public void setMatrix(int width,int height,int type){

        switch (type)
        {
            case 0:
                originMatrix = DenseMatrix.Factory.zeros(width,height);
                break;

            case 1:
                releventMatrix = DenseMatrix.Factory.zeros(width,height);
                break;
        }

        this.width = width;
        this.height = height;


    }

    public Matrix  setData(String value,int type){

        Matrix tempMatrix = null;
        switch (type)
        {
            case 0:
                tempMatrix = originMatrix;
                break;

            case 1:

                tempMatrix = releventMatrix;
                break;

            default:

                break;


        }
        String[] valueArray = value.split("&");
        int index = 0;
        for (int i  =0;i<width;i++){

            for (int j = 0 ;j<height;j++){

                //System.out.println(valueArray[index]);
                tempMatrix.setAsDouble(new Float(valueArray[index]),i,j);
                index++;
            }
        }

        return  tempMatrix;

    }

    public Matrix inverse(){

        originMatrix = originMatrix.inv();
        return originMatrix;
    }
    public Matrix mul(){

        originMatrix = originMatrix.mtimes(releventMatrix);

        return originMatrix;

    }


    @Override
    public String toString() {
        String value = "";


        int index = 0;
        for (int i  =0;i<width;i++){

            for (int j = 0 ;j<height;j++){

                value += originMatrix.getAsString(i,j)+"&";

                index++;
            }
        }

        return value;
    }
}
