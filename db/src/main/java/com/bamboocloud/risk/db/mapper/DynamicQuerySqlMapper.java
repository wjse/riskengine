package com.bamboocloud.risk.db.mapper;

import com.bamboocloud.risk.db.entity.DynamicQuerySql;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface DynamicQuerySqlMapper {

    void insert(DynamicQuerySql sql);
    void update(DynamicQuerySql sql);
    void delete(Integer id);
    void deleteByChartAndModule(@Param("chartId") String chartId, @Param("module") String module);
    void deleteByChart(String chartId);
    DynamicQuerySql get(Integer id);
    List<DynamicQuerySql> queryForList(Map<String, Object> map);

    int getCountByDataSource(int id);

    DynamicQuerySql getByChart(@Param("chartId") String chartId, @Param("module") String module);
}
