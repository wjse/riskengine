package com.bamboocloud.risk.chart.dynamic;

import com.bamboocloud.risk.db.entity.DynamicQuerySql;
import com.github.pagehelper.PageInfo;

import java.util.List;
import java.util.Map;

public interface DynamicQuerySqlService {

    void save(DynamicQuerySql sql);
    void update(DynamicQuerySql sql);
    void remove(int id);
    void delete(int id) throws IllegalAccessException;
    void delete(String chartId , String module);
    void delete(String chartId);
    DynamicQuerySql get(int id);
    PageInfo<DynamicQuerySql> query(int pageNum , Map<String,Object> map);
    List<DynamicQuerySql> query(Map<String,Object> map);
    List<Map<String,Object>> executeQuery(int id , Map<String,Object> map);
    List<Map<String,Object>> executeQuery(int dataSourceId ,String sql , Map<String,Object> map);
    int getCountByDataSource(int id);
    DynamicQuerySql getByChart(String chartId, String module);
}
