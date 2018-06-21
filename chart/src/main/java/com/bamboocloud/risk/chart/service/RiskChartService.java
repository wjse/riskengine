package com.bamboocloud.risk.chart.service;

import java.util.List;
import java.util.Map;

public interface RiskChartService {

    Map<String,List<Map<String,Object>>> queryAccessResult(int type);

    List<Map<String,Object>> queryAccessCity(int type);

    Map<String, List<Map<String,Object>>> queryAccessResultDay(Long startTime , Long endTime);

    List<Map<String,Object>> queryRuleRiskCount(String type , int timeType);

    List<Map<String, Object>> queryRuleRiskCountDay(String type, Long startDate, Long endDate);
}
