package com.bamboocloud.risk.db.mapper;

import com.bamboocloud.risk.db.entity.DynamicHtml;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface DynamicHtmlMapper {

    void insert(DynamicHtml html);
    void update(DynamicHtml html);
    void delete(String id);
    DynamicHtml get(String id);
}
