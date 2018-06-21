package com.bamboocloud.risk.support;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class RequestUtil {

    public static final int PAGE_SIZE = 10;

    public static String getServerPath(HttpServletRequest request){
        return String.format("http://%s:%s%s" , request.getServerName() ,
                                                request.getServerPort(),
                                                request.getServletContext().getContextPath());
    }

    public static String getResourcePath(HttpServletRequest request , String resourceName){
        return String.format("%s%s" , getServerPath(request) , resourceName);
    }

    public static String getRealPath(HttpServletRequest request , String folderName){
        return request.getServletContext().getRealPath(folderName);
    }

    public static Map<String , Object> parameterMap(HttpServletRequest request){
        Map<String,Object> map = new ConcurrentHashMap<>();
        Enumeration<String> names = request.getParameterNames();
        while(names.hasMoreElements()){
            String k = names.nextElement();
            map.put(k , request.getParameter(k));
        }

        return map;
    }

    public static HttpServletRequest getRequest(){
        return ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
    }
}
