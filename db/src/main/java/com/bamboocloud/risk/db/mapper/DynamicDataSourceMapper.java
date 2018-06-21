package com.bamboocloud.risk.db.mapper;

import com.bamboocloud.risk.db.entity.DynamicDataSource;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface DynamicDataSourceMapper {

    void insert(DynamicDataSource entity);

    void update(DynamicDataSource entity);

    void delete(int id);

    DynamicDataSource get(int id);

    List<DynamicDataSource> queryForList(Map<String,Object> map);
}
