package com.main.activity.signature;

import net.sf.json.JSONObject;

public class SignatureObject {

    public int status = 0;
    public String id = "";

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String path1 = "";

    public String path2 = "";
    public String AUser = "";
    public String BUser = "";

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getPath1() {
        return path1;
    }

    public void setPath1(String path1) {
        this.path1 = path1;
    }

    public String getPath2() {
        return path2;
    }

    public void setPath2(String path2) {
        this.path2 = path2;
    }

    public String getAUser() {
        return AUser;
    }

    public void setAUser(String AUser) {
        this.AUser = AUser;
    }

    public String getBUser() {
        return BUser;
    }

    public void setBUser(String BUser) {
        this.BUser = BUser;
    }

    @Override
    public String toString() {


        return JSONObject.fromObject(this).toString();
    }
}
