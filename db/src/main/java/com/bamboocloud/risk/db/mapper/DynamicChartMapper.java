package com.bamboocloud.risk.db.mapper;

import com.bamboocloud.risk.db.entity.DynamicChart;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface DynamicChartMapper {

    void insert(DynamicChart chart);
    void update(DynamicChart chart);
    void delete(String id);
    DynamicChart get(String id);
    List<DynamicChart> queryForList(Map<String,Object> map);
    int getCountById(String id);
}
