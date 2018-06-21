package com.bamboocloud.risk.chart.dynamic;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.bamboocloud.risk.support.MapUtil;
import org.springframework.stereotype.Service;

@Service
public class PieOptionService extends OptionService {

    private final static String JS_FUNCTION_FORMAT = "#loadPieData('%s' , '%s')#";

    @Override
    protected JSONObject axis(JSONObject chartJSON, String axisKey) {
        return null;
    }

    @Override
    protected JSONArray series(JSONObject chartJSON) {
        JSONArray seriesConfig = chartJSON.getJSONArray("series");
        JSONArray series = new JSONArray();
        JSONArray data = new JSONArray();

        for(int i = 0 ; i < seriesConfig.size() ; i++){
            JSONObject config = seriesConfig.getJSONObject(i);

            if(CUSTOM_DATA_TYPE.equals(config.getString("dataType"))){
                data.add(MapUtil.newMap(new String[]{"name" , "value"} ,
                                        new String[]{config.getString("name") , config.getString("value")}));
            }else{
                JSONObject sql = config.getJSONObject("sql");
                String module = sql.getString("module");
                String mapping = sql.getString("columns");

                if(mapping.contains(" ")){
                    mapping = mapping.split(" ")[1];
                }

                String url = String.format(JS_URL_FORMAT , SERVER_PATH , chartJSON.getString("id") , module);

                data.add(MapUtil.newMap(new String[]{"name" , "value"} ,
                                        new String[]{config.getString("name") ,
                                                     String.format(JS_FUNCTION_FORMAT , url , mapping)}));
            }
        }

        JSONObject base = new JSONObject(MapUtil.newMap(new String[]{"name" , "type"} ,
                                                        new String[]{chartJSON.getString("name") ,
                                                                     chartJSON.getString("type")}));
        base.put("data" , data);
        series.add(base);
        return series;
    }
}
