package com.bamboocloud.risk.chart.model;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.apache.commons.lang.StringUtils;

public class DynamicChartForm {

    private String id;
    private String type;
    private String status;
    private String text;
    private JSONObject xAxis;
    private JSONObject yAxis;
    private JSONArray series;

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

    public JSONObject getxAxis() {
        return xAxis;
    }

    public void setxAxis(JSONObject xAxis) {
        this.xAxis = xAxis;
    }

    public JSONObject getyAxis() {
        return yAxis;
    }

    public void setyAxis(JSONObject yAxis) {
        this.yAxis = yAxis;
    }

    public JSONArray getSeries() {
        return series;
    }

    public void setSeries(JSONArray series) {
        this.series = series;
    }

    public boolean isUpdate(){
        return StringUtils.isNotBlank(this.id);
    }
}
