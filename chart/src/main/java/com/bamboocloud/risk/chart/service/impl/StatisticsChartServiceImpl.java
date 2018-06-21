package com.bamboocloud.risk.chart.service.impl;

import com.bamboocloud.risk.chart.service.StatisticsChartService;
import com.bamboocloud.risk.db.mapper.StatisticsChartMapper;
import com.bamboocloud.risk.support.RequestUtil;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class StatisticsChartServiceImpl implements StatisticsChartService {

    @Autowired
    private StatisticsChartMapper mapper;

    @Override
    public Map<String, List<Map<String, Object>>> queryActiveTimeQuantum() {
        List<Map<String,Object>> list = mapper.queryActiveTimeQuantum();
        Map<String,List<Map<String,Object>>> map = new HashMap<>();
        if(null == list || list.isEmpty()){
            return map;
        }

        list.forEach(data -> {
            final String app = data.get("app").toString();
            if(!map.containsKey(app)){
                map.put(app , new ArrayList<>());
            }

            map.get(app).add(data);
        });
        return map;
    }

    @Override
    public List<Map<String,Object>> queryIpPortrayalCount(Map<String,Object> map) {
        return mapper.queryIpPortrayalCount(map);
    }

    @Override
    public PageInfo<Map<String,Object>> queryUserRiskAccount(int pageNum) {
        return PageHelper.startPage(pageNum, RequestUtil.PAGE_SIZE)
                .doSelectPageInfo(() -> mapper.queryUserRiskAccount());
    }

    @Override
    public void deleteRiskUserAccount(int id) {
        mapper.deleteUserRiskAccount(id);
    }
}
