package com.bamboocloud.risk.db.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface StatisticsChartMapper {
    List<Map<String,Object>> queryActiveTimeQuantum();

    List<Map<String,Object>> queryIpPortrayalCount(Map<String,Object> map);

    List<Map<String,Object>> queryUserRiskAccount();

    void deleteUserRiskAccount(@Param("id") int id);
}
