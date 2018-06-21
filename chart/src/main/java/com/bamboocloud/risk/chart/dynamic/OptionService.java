package com.bamboocloud.risk.chart.dynamic;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.bamboocloud.risk.support.PropertiesUtil;

import java.util.ArrayList;
import java.util.List;

public abstract class OptionService {

    protected static final String SERVER_PATH = PropertiesUtil.of("dynamic_config.properties")
                                                              .getProperty("server_path");

    protected static final String JS_URL_FORMAT = "%s/dynamic/chart/data/%s/%s";
    protected static final String VALUE_TYPE = "value";
    protected static final String CUSTOM_DATA_TYPE = "custom";

    public void option(JSONObject chartJSON , JSONObject option) {
        option.put("legend" , legend(chartJSON));
        option.put("xAxis" , axis(chartJSON , "xAxis"));
        option.put("yAxis" , axis(chartJSON , "yAxis"));
        option.put("series" , series(chartJSON));
    }

    protected JSONObject legend(JSONObject chartJSON) {
        JSONObject legend = new JSONObject();
        JSONArray series = chartJSON.getJSONArray("series");

        List<String> data = new ArrayList<>();
        for(int i = 0 ; i < series.size() ; i++){
            data.add(series.getJSONObject(i).getString("name"));
        }

        legend.put("data" , data);
        return legend;
    }

    protected abstract JSONObject axis(JSONObject chartJSON , String axisKey);

    protected abstract JSONArray series(JSONObject chartJSON);
}
