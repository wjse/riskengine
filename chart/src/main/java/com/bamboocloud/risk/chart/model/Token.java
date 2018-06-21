package com.bamboocloud.risk.chart.model;

import com.bamboocloud.risk.support.EncryptUtil;
import com.bamboocloud.risk.support.IdWorker;
import org.apache.commons.lang3.StringUtils;

public class Token {

    public static String create(){
        return create(IdWorker.uuid());
    }

    public static String create(String str){
        String source = String.format("%s-%s" , str , System.currentTimeMillis());
        String base64 = EncryptUtil.base64Encode(EncryptUtil.hex(source , "SHA1") , "utf-8");
        return base64.replaceAll("=","");
    }

    public static String getSource(String token){
        if(StringUtils.isEmpty(token) || "null".equals(token) || "undefined".equals(token)){
            return null;
        }
        String base64 = String.format("%s==" , token);
        return EncryptUtil.base64Decode(base64 , "utf-8");
    }
}
