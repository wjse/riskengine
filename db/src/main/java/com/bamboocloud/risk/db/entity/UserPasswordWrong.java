package com.bamboocloud.risk.db.entity;

import java.util.Date;

public class UserPasswordWrong {
    private int id;
    private String userId;
    private Date createTime;

    public UserPasswordWrong(String userId, Date createTime) {
        this.userId = userId;
        this.createTime = createTime;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }
}
