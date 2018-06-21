package com.bamboocloud.risk.chart.model;

import com.bamboocloud.risk.db.entity.User;
import org.apache.commons.lang.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class SessionMock {

    private static Map<String,Object> session = new ConcurrentHashMap<>();

    public static void put(String k , Object v){
        session.put(k,v);
    }

    public static Object get(String k){
        return session.get(k);
    }

    public static boolean has(String k){
        return null != session.get(k);
    }

    public static void remove(String k){
        session.remove(k);
    }

    public static User getCurrentSessionUser(HttpServletRequest request){
        String token = request.getHeader("Token");
        if(StringUtils.isEmpty(token)){
            return null;
        }

        String source = Token.getSource(token);
        return (User) get(source);
    }
}
