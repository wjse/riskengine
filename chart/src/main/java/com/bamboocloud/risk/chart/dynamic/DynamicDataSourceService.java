package com.bamboocloud.risk.chart.dynamic;

import com.bamboocloud.risk.db.entity.DynamicDataSource;
import com.github.pagehelper.PageInfo;
import org.apache.commons.dbcp.BasicDataSource;

import java.util.List;
import java.util.Map;


public interface DynamicDataSourceService {


    void save(DynamicDataSource dataSource);
    void update(DynamicDataSource dataSource);
    void delete(int id) throws IllegalAccessException;
    PageInfo<DynamicDataSource> query(int pageNum , Map<String,Object> map);
    void startUp(int id);
    void startUp(List<DynamicDataSource> list);
    void shutdown(int id , boolean isDelete);
    void shutdown(List<Integer> idList , boolean isDelete);
    String getDynamicDataSourceBeanName(DynamicDataSource dataSource);
    DynamicDataSource get(int id);
    BasicDataSource getBasicDataSource(int dynamicDataSourceId);
    BasicDataSource getBasicDataSource(DynamicDataSource dataSource);
    List<DynamicDataSource> query(Map<String, Object> map);
}
