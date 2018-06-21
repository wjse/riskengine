package com.bamboocloud.risk.support;

import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

public class MapUtil {

    public static <k,v> Map<k,v> newMap(k[] key , v[] value){
        if(null == key || key.length == 0){
            return new HashMap<>();
        }

        int length = key.length;
        boolean isNullValue = false;
        if(null == value || value.length == 0){
            isNullValue = true;
        }else if(length > value.length){
            length = value.length;
        }

        Map<k,v> map = new HashMap<>();
        if(isNullValue){
            for(int i = 0 ; i < length ; i++){
                map.put(key[i] , null);
            }
        }else{
            for(int i = 0 ; i < length ; i++){
                map.put(key[i] , value[i]);
            }
        }

        return map;
    }

    public static Map<String,String> propertiesToMap(Properties properties){
        if(null == properties || properties.isEmpty()){
            return null;
        }

        Map<String,String> map = new HashMap<>();
        properties.stringPropertyNames().forEach( k -> map.put(k , properties.getProperty(k)));

        return map;
    }
}
