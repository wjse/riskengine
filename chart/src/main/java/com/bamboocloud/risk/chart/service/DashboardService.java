package com.bamboocloud.risk.chart.service;

import com.alibaba.fastjson.JSONArray;

import java.util.List;
import java.util.Map;

public interface DashboardService {

    List<Map<String,Object>> queryRiskCountCards();

    Map<String,Object> queryWeekAppCount();

    Map<String, Object> queryWeekUserCount();

    List<Map<String,Object>> queryDeviceCount();

    JSONArray queryAmbariHosts();
}
