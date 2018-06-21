package com.bamboocloud.risk.db.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Mapper
public interface DashboardMapper {

    List<Map<String,Object>> queryCurrentRiskCount(Date createTime);

    List<Map<String,Object>> queryWeekAppCount(Date createTime);

    Map<String,Object> queryWeekUserCount(Date weekTime);

    List<Map<String,Object>> queryTotalDeviceCount();
}
