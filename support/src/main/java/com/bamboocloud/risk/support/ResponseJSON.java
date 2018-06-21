package com.bamboocloud.risk.support;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import java.util.List;
import java.util.Map;

public class ResponseJSON extends JSONObject {
    /**
     * 成功
     */
    public static final int SUCCESS = 200;

    /**
     * 数据不存在
     */
    public static final int NOT_FOUND = 404;

    /**
     * 业务异常
     */
    public static final int FORBIDDEN = 403;

    /**
     * 校验错误
     */
    public static final int VALIDATE_FAIL = 412;

    /**
     * 入参错误
     */
    public static final int PARAMETER_WRONG = 415;

    /**
     * 鉴权错误
     */
    public static final int AUTH_FAIL = 416;

    /**
     * 系统级错误
     */
    public static final int SERVER_ERROR = 500;

    public ResponseJSON(){
        this(SUCCESS,"success");
    }

    public ResponseJSON(Object data){
        this(SUCCESS,"success",data);
    }

    public ResponseJSON(List<?> list){
        this(SUCCESS,"success",list);
    }

    public ResponseJSON(int status , String msg){
        put("status",status);
        if(status != SUCCESS){
            put("error",msg);
        }else{
            put("msg",msg);
        }
    }

    public ResponseJSON(int status , String msg , Object data){
        this(status,msg);
        put("data",data);
    }

    public ResponseJSON(int status , String msg , List<?> list){
        this(status,msg);
        if(null != list){
            JSONArray jsonArray = new JSONArray();
            list.stream().forEach((o) -> jsonArray.add(o) );
            put("data",jsonArray);
        }
    }

    public ResponseJSON(Map<String,Object> map){
        if(null != map){
            map.forEach((k,v) -> put(k,v));
        }
    }

    public ResponseJSON add(String key , Object value){
        put(key,value);
        return this;
    }

    public boolean isOk(){
        return getInteger("status") == 200;
    }

}
