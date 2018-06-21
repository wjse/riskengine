package com.bamboocloud.risk.redis;

import com.bamboocloud.risk.support.PropertiesUtil;
import redis.clients.jedis.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

/**
 * <p>文件名称: com.bamboocloud.util.JedisClientPool</p>
 * <p>文件描述: </p>
 * <p>版权所有: 版权所有(C)2018</p>
 * <p>公 司: 深圳竹云科技有限公司</p>
 * <p>内容摘要: // 简要描述本文件的内容，包括主要模块、函数及能的说明</p>
 * <p>其他说明: </p>
 * <p>完成日期: 2018/2/5 12:57</p>
 *
 * @author desong.tang
 */
public class JedisClientPool {

    private static final Properties PROPS = PropertiesUtil.of("redis.properties");
    private static boolean isCluster = Boolean.valueOf(PROPS.getProperty("redis.sharded.cluster","false"));
    private static ShardedJedisPool shardedJedisPool;
    private static JedisPool jedisPool;

    private static void getSoloJedisPool(){
        if (null == jedisPool){
            JedisPoolConfig config = new JedisPoolConfig();
            config.setMaxTotal(Integer.valueOf(PROPS.getProperty("redis.maxTotal","100")));
            config.setMaxIdle(Integer.valueOf(PROPS.getProperty("redis.maxIdle","5")));
            config.setMaxWaitMillis(Integer.valueOf(PROPS.getProperty("redis.waitMillis","1000*10")));
            config.setTestOnBorrow(false);
            config.setTestOnReturn(true);
            jedisPool = new JedisPool(config, PROPS.getProperty("redis.ip"),
                    Integer.valueOf(PROPS.getProperty("redis.port","6379")),
                    10000);
        }
    }

    private static void getHAJedisPool(){
        if (null == shardedJedisPool){
            JedisPoolConfig config = new JedisPoolConfig();
            config.setMaxTotal(Integer.valueOf(PROPS.getProperty("redis.maxTotal","500")));
            config.setMaxIdle(Integer.valueOf(PROPS.getProperty("redis.maxIdle","100")));
            config.setMaxWaitMillis(Integer.valueOf(PROPS.getProperty("redis.waitMillis","1000*10")));
            config.setTestOnBorrow(false);
            config.setTestOnReturn(false);
            List<JedisShardInfo> list = new ArrayList<>();
            JedisShardInfo info = new JedisShardInfo(PROPS.getProperty("redis.ip"),
                    Integer.valueOf(PROPS.getProperty("redis.port","6379")));
            info.setPassword(PROPS.getProperty("redis.auth"));
            list.add(info);
            shardedJedisPool = new ShardedJedisPool(config,list);
        }
    }

    public synchronized static JedisCommands getJedis(){
        if (isCluster){
            if (null == shardedJedisPool) getHAJedisPool();
            return shardedJedisPool.getResource();
        }

        if (null == jedisPool) getSoloJedisPool();
        return jedisPool.getResource();
    }
}
