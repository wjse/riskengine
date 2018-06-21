package com.bamboocloud.risk.chart.dynamic;

import com.alibaba.fastjson.JSONObject;
import com.bamboocloud.risk.db.entity.DynamicHtml;

import java.io.IOException;

public interface DynamicHtmlService {

    DynamicHtml build(JSONObject json) throws IOException;
    void remove(String id);
}
