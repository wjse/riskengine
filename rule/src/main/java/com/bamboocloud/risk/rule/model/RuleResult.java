package com.bamboocloud.risk.rule.model;

import com.alibaba.fastjson.JSONObject;

public class RuleResult {
    private String code;
    private String message;

    public RuleResult(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return JSONObject.toJSONString(this);
    }

}
