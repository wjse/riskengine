package com.bamboocloud.risk.chart.service.impl;

import com.bamboocloud.risk.chart.service.RiskChartService;
import com.bamboocloud.risk.db.mapper.RiskChartMapper;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RiskChartServiceImpl implements RiskChartService {

    @Autowired
    private RiskChartMapper mapper;

    @Override
    public Map<String, List<Map<String,Object>>> queryAccessResult(int type) {
        return separateAccessResultCount(mapper.queryAccessResultCount(type));
    }

    @Override
    public List<Map<String, Object>> queryAccessCity(int type) {
        return mapper.queryAccessCityCount(type);
    }

    @Override
    public Map<String, List<Map<String,Object>>> queryAccessResultDay(Long startTime , Long endTime) {
        Map<String,Date> map = new HashMap<>();
        if(null != startTime){
            map.put("startTime" , new Date(startTime));
        }

        if(null != endTime){
            map.put("endTime" , new Date(endTime));
        }
        return separateAccessResultCount(mapper.queryAccessResultCountDay(map));
    }

    @Override
    public List<Map<String, Object>> queryRuleRiskCount(String type, int timeType) {
        Map<String,Object> map = new HashMap<>();
        map.put("type" , StringUtils.isEmpty(type) ? "" : type.toUpperCase());
        map.put("timeType" , timeType);
        return mapper.queryRuleRiskCount(map);
    }

    @Override
    public List<Map<String, Object>> queryRuleRiskCountDay(String type, Long startDate, Long endDate) {
        Map<String,Object> map = new HashMap<>();
        map.put("type" , StringUtils.isEmpty(type) ? "" : type.toUpperCase());
        if(null != startDate){
            map.put("startTime" , new Date(startDate));
        }

        if(null != endDate){
            map.put("endTime" , new Date(endDate));
        }
        return mapper.queryRuleRiskCountDay(map);
    }

    private Map<String, List<Map<String,Object>>> separateAccessResultCount(List<Map<String,Object>> list){
        Map<String, List<Map<String,Object>>> resultMap = new HashMap<>();
        resultMap.put("trueResult" , new ArrayList<>());
        resultMap.put("falseResult" , new ArrayList<>());

        if(null == list || list.isEmpty()){
            return resultMap;
        }

        list.forEach(resultCount -> {
            boolean result = "1".equals(resultCount.get("result")) ? true : false;
            if(result){
                resultMap.get("trueResult").add(resultCount);
            }else{
                resultMap.get("falseResult").add(resultCount);
            }
        });

        return resultMap;
    }
}
