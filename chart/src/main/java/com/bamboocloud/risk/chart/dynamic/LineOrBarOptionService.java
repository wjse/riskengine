package com.bamboocloud.risk.chart.dynamic;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.bamboocloud.risk.support.MapUtil;
import org.springframework.stereotype.Component;

@Component
public class LineOrBarOptionService extends OptionService {

    private final static String JS_FUNCTION_FORMAT = "#loadLineOrBarData('%s' , '%s')#";

    protected JSONObject axis(JSONObject chartJSON , String axisKey){
        JSONObject config = chartJSON.getJSONObject(axisKey);
        String type = config.getString("type");
        JSONObject axis = new JSONObject(MapUtil.newMap(new String[]{"name" , "type"} ,
                new String[]{config.getString("name") , type}));

        if(VALUE_TYPE.equals(type)){
            return axis;
        }

        lineOrBarData(config , axis , chartJSON.getString("id"));
        return axis;
    }

    protected JSONArray series(JSONObject chartJSON){
        JSONArray configArray = chartJSON.getJSONArray("series");
        JSONArray series = new JSONArray();
        for(int i = 0 ; i < configArray.size() ; i++){
            JSONObject config = configArray.getJSONObject(i);
            JSONObject seriesObj = new JSONObject();
            seriesObj.put("name" , config.getString("name"));
            seriesObj.put("type" , chartJSON.getString("type"));
            lineOrBarData(config , seriesObj , chartJSON.getString("id"));
            series.add(seriesObj);
        }
        return series;
    }

    protected void lineOrBarData(JSONObject config , JSONObject target , String chartId){
        if(CUSTOM_DATA_TYPE.equals(config.getString("dataType"))){
            String value = config.getString("value");
            if(value.indexOf(",") > -1){
                target.put("data" , value.split(","));
            }else if(value.indexOf("，") > -1){
                target.put("data" , value.split("，"));
            }else{
                target.put("data" , new String[]{value});
            }
        }else{
            JSONObject sql = config.getJSONObject("sql");
            String module = sql.getString("module");
            String mapping = sql.getString("columns");

            if(mapping.contains(" ")){
                mapping = mapping.split(" ")[1];
            }

            String url = String.format(JS_URL_FORMAT , SERVER_PATH , chartId , module);
            target.put("data" , String.format(JS_FUNCTION_FORMAT , url , mapping));
        }
    }
}
