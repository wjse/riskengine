package com.bamboocloud.risk.chart.web.filter;

import com.bamboocloud.risk.chart.model.SessionMock;
import com.bamboocloud.risk.chart.model.Token;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AuthInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object o) throws IOException {
        String method = request.getMethod();
        if("OPTIONS".equals(method)){
            return true;
        }

        String token = request.getHeader("Token");
        if(StringUtils.isEmpty(token)){
            response.sendError(401 , "Auth invalidate");
            return false;
        }

        String source = Token.getSource(token);
        if(StringUtils.isEmpty(source)){
            response.sendError(401 , "Auth invalidate");
            return false;
        }

        if(!SessionMock.has(source)){
            response.sendError(401 , "Auth invalidate");
            return false;
        }
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object o, ModelAndView modelAndView){

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object o, Exception e){

    }
}
