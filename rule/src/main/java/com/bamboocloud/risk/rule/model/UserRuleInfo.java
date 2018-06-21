package com.bamboocloud.risk.rule.model;

public class UserRuleInfo {

    private String id;
    private String ip;
    private String city;
    private String device;

    public UserRuleInfo(String id, String ip, String city, String device) {
        this.id = id;
        this.ip = ip;
        this.city = city;
        this.device = device;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getDevice() {
        return device;
    }

    public void setDevice(String device) {
        this.device = device;
    }
}
