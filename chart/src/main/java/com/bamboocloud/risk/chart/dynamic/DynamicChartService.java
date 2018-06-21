package com.bamboocloud.risk.chart.dynamic;

import com.bamboocloud.risk.db.entity.DynamicChart;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageInfo;

import java.io.IOException;
import java.util.List;

public interface DynamicChartService {

    PageInfo<DynamicChart> query(int pageNum);
    void update(DynamicChart chart) throws IOException, IllegalAccessException;
    void save(DynamicChart chart) throws IOException, IllegalAccessException;
    Object loadModuleData(String chartId, String module);
    void delete(String id);
}
