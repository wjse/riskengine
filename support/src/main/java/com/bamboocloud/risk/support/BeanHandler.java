package com.bamboocloud.risk.support;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

public class BeanHandler implements ApplicationContextAware {

    private static ApplicationContext context;

    private static void setApplicationContextStatic(ApplicationContext applicationContext){
        context = applicationContext;
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        setApplicationContextStatic(applicationContext);
    }

    public static  <T> T getBean(Class<T> clz){
        return context.getBean(clz);
    }

    public static  <T> T getBean(String name){
        return (T) context.getBean(name);
    }
}
