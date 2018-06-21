package com.bamboocloud.risk.support;

import java.io.IOException;
import java.util.Properties;

public class PropertiesUtil {

    public static final Properties of(String path){
        Properties p = new Properties();
        try {
            p.load(PropertiesUtil.class.getClassLoader().getResourceAsStream(path));
            return p;
        } catch (IOException e) {
            System.err.println(e);
            System.exit(3);
            return null;
        }
    }
}
