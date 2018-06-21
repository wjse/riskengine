package com.bamboocloud.risk.rule.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.bamboocloud.risk.db.entity.Rule;
import com.bamboocloud.risk.db.entity.UserGeneralInfo;
import com.bamboocloud.risk.redis.JedisClientPool;
import com.bamboocloud.risk.support.BeanHandler;
import com.bamboocloud.risk.user.UserGeneralInfoService;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisCommands;

import java.util.List;

/**
 * 用户常用行为规则处理
 * 从用户日常行为表中匹配规则
 */
public class UserGeneralInfoRule {

    private static final Logger logger = LoggerFactory.getLogger(UserGeneralInfoRule.class);
    private UserGeneralInfoService userGeneralInfoService = BeanHandler.getBean(UserGeneralInfoService.class);

    public boolean hit(Rule rule , String userId , String value){
        List<UserGeneralInfo> list = getCacheVal(userId,rule.getType().toLowerCase());
        if(null == list || list.isEmpty()){
            return false;
        }

        return !list.stream().filter(info -> info.getValue().indexOf(value) != -1).findAny().isPresent();
    }

    private List<UserGeneralInfo> getCacheVal(String userId,String ruleType){
        List<UserGeneralInfo> list = null;
        JedisCommands jedis = JedisClientPool.getJedis();
        try {
            String key = "bcre.info."+userId+"."+ruleType;
            String val = jedis.get(key);

            if (StringUtils.isNotEmpty(val)) {
                return JSONArray.parseArray(val, UserGeneralInfo.class);
            }

            list = userGeneralInfoService.queryUserGeneralInfo(userId , ruleType);
            if (list.size() != 0){
                jedis.set(key, JSONObject.toJSONString(list));
            }
        }catch (Exception e){
            logger.error(e.getMessage(),e);
        }
        return list;
    }
}
