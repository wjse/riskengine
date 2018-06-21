package com.bamboocloud.risk.chart.service;

import com.github.pagehelper.PageInfo;

import java.util.List;
import java.util.Map;

public interface StatisticsChartService {
    Map<String,List<Map<String,Object>>> queryActiveTimeQuantum();

    List<Map<String,Object>> queryIpPortrayalCount(Map<String,Object> map);

    PageInfo<Map<String,Object>> queryUserRiskAccount(int pageNum);

    void deleteRiskUserAccount(int id);
}
