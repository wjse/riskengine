package com.bamboocloud.risk.db.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Mapper
public interface RiskChartMapper {

    List<Map<String,Object>> queryAccessResultCount(int type);

    List<Map<String,Object>> queryAccessCityCount(int type);

    List<Map<String,Object>> queryRuleRiskCount(Map<String,Object> map);

    List<Map<String,Object>> queryRuleRiskCountDay(Map<String, Object> map);

    List<Map<String,Object>> queryAccessResultCountDay(Map<String,Date> map);

    void clearAccessResultCount();

    void deleteAccessResultCount(Map map);

    void addAccessResultCount(@Param("result") int result, @Param("time") String time);

    void addAccessCityCount(@Param("cityName") String cityName);

    int getACCByNameAndType(@Param("cityName") String cityName,@Param("type") int i);

    void insertAccessCityCount(@Param("cityName") String cityName);

    void clearAccessCityCount();

    void clearRuleRiskCount(@Param("type") String type);

    void deleteRuleRiskCount(@Param("table") String table,@Param("time") int time,@Param("type") int type);
}
