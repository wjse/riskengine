package com.bamboocloud.risk.support;

public enum StatusEnum {

    NORMAL("正常") , DISABLED("禁用") , STARTUP("启动") , SHUTDOWN("未启动");

    public String getValue() {
        return value;
    }

    String value;
    StatusEnum(String value){
        this.value = value;
    }
}
