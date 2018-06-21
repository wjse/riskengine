package com.bamboocloud.risk.chart.web.filter;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class CorsFilter implements Filter {

    private String origin;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        this.origin = filterConfig.getInitParameter("origin");
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        response.setHeader("Access-Control-Allow-Origin", origin);
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE, PATCH");
        response.setHeader("Access-Control-Allow-Headers", "Token,Origin, X-Requested-With,X-Custom-Header,Content-Type, Accept");
        response.setHeader("Access-Control-Max-Age", "3600");
        filterChain.doFilter(request,response);
    }

    @Override
    public void destroy() {

    }
}
