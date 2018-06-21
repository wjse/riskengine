package com.bamboocloud.risk.chart.dynamic;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.bamboocloud.risk.support.MapUtil;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class ScatterOptionService extends OptionService {

    private final static String JS_FUNCTION_FORMAT = "#loadScatterData('%s' , '%s' , '%s')#";

    @Override
    protected JSONObject axis(JSONObject chartJSON, String axisKey) {
        return new JSONObject();
    }

    @Override
    protected JSONArray series(JSONObject chartJSON) {
        JSONArray seriesConfig = chartJSON.getJSONArray("series");
        JSONArray series = new JSONArray();

        Pattern pattern = Pattern.compile("(\\[)(.+?)(\\])");
        for(int i = 0; i < seriesConfig.size(); i++){
            JSONObject config = seriesConfig.getJSONObject(i);
            List<String> list = new ArrayList<>();

            JSONObject base = new JSONObject(MapUtil.newMap(new String[]{"name" , "type"} ,
                                                            new String[]{config.getString("name") ,
                                                                         chartJSON.getString("type")}));

            if(CUSTOM_DATA_TYPE.equals(config.getString("dataType"))){
                JSONArray data = new JSONArray();
                String value = config.getString("value");
                Matcher matcher = pattern.matcher(value);
                while(matcher.find()){
                    list.add(matcher.group());
                }

                for(String s : list){
                    String v = s.replaceAll("\\[" , "").replaceAll("\\]" , "");
                    if(v.indexOf(",") > -1){
                        data.add(v.split(","));
                    }else if(v.indexOf("，") > -1){
                        data.add(v.split("，"));
                    }
                }
                base.put("data" , data);
            }else{
                JSONObject sql = config.getJSONObject("sql");
                String module = sql.getString("module");
                String[] mapping = sql.getString("columns").split(",");

                for(int j = 0 ; j < mapping.length ; j++){
                    if(mapping[j].contains(" ")){
                        mapping[j] = mapping[j].split(" ")[1];
                    }
                }

                String url = String.format(JS_URL_FORMAT , SERVER_PATH , chartJSON.getString("id") , module);
                base.put("data" , String.format(JS_FUNCTION_FORMAT , url , mapping[0] , mapping[1]));
            }

            series.add(base);
        }
        return series;
    }
}
