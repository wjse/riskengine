package com.bamboocloud.risk.db.entity;

import com.alibaba.fastjson.JSONObject;

import java.util.Date;

/**
 * 动态报表实体
 */
public class DynamicChart {

    private String id;
    private String type;
    private String status;
    private String text;
    private String xAxis;
    private String yAxis;
    private String series;
    private String htmlId;
    private String htmlUrl;
    private String creator;
    private Date createTime;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getxAxis() {
        return xAxis;
    }

    public void setxAxis(String xAxis) {
        this.xAxis = xAxis;
    }

    public String getyAxis() {
        return yAxis;
    }

    public void setyAxis(String yAxis) {
        this.yAxis = yAxis;
    }

    public String getSeries() {
        return series;
    }

    public void setSeries(String series) {
        this.series = series;
    }

    public String getHtmlId() {
        return htmlId;
    }

    public void setHtmlId(String htmlId) {
        this.htmlId = htmlId;
    }

    public String getHtmlUrl() {
        return htmlUrl;
    }

    public void setHtmlUrl(String htmlUrl) {
        this.htmlUrl = htmlUrl;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public DynamicChart create(User user){
        setCreateTime(new Date());
        setCreator(user.getUsername());
        return this;
    }

    @Override
    public String toString() {
        return JSONObject.toJSONString(this);
    }
}
