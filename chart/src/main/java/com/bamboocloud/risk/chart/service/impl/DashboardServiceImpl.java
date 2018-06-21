package com.bamboocloud.risk.chart.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.bamboocloud.risk.chart.service.DashboardService;
import com.bamboocloud.risk.db.mapper.DashboardMapper;
import com.bamboocloud.risk.support.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class DashboardServiceImpl implements DashboardService{

    private static final long ONE_DAY_MILLS = 86400000;

    private static final long SEVEN_DAY_MILLS = ONE_DAY_MILLS * 7;

    @Autowired
    private AmbariRestService ambariRestService;

    @Autowired
    private DashboardMapper mapper;

    @Override
    public List<Map<String, Object>> queryRiskCountCards() {
        return mapper.queryCurrentRiskCount(new Date());
    }

    @Override
    public Map<String,Object> queryWeekAppCount() {
        Calendar calendar = new GregorianCalendar();
        int currentWeekDay = calendar.get(Calendar.DAY_OF_WEEK),
            day = currentWeekDay == 0 ? 0 : currentWeekDay - 1;

        //start sunday
        long sundayMills = (calendar.getTimeInMillis() - day * ONE_DAY_MILLS) - SEVEN_DAY_MILLS;

        //last saturday
        long saturdayMills = (calendar.getTimeInMillis() - (day - 6) * ONE_DAY_MILLS) - SEVEN_DAY_MILLS;

        if(day != 0){
            calendar.setTimeInMillis(sundayMills);
        }

        List<Map<String,Object>> list = mapper.queryWeekAppCount(calendar.getTime());
        Map<String,Object> map = new HashMap<>();
        map.put("list",list);
        map.put("startTime" , DateUtil.getStringByDate(new Date(sundayMills) , DateUtil.PATTERN_DEFAULT));
        map.put("endTime" , DateUtil.getStringByDate(new Date(saturdayMills) , DateUtil.PATTERN_DEFAULT));
        return map;
    }

    @Override
    public Map<String, Object> queryWeekUserCount() {
        Date currentDate = new Date();
        Map<String,Object> currentWeek = mapper.queryWeekUserCount(currentDate);
        if(null == currentWeek){
            return null;
        }
        currentWeek.put("startTime" , DateUtil.getStringByDate((Date) currentWeek.get("startTime"), DateUtil.PATTERN_DEFAULT));
        currentWeek.put("endTime" , DateUtil.getStringByDate((Date) currentWeek.get("endTime"), DateUtil.PATTERN_DEFAULT));

        Date lastWeekDate = new Date(currentDate.getTime() - SEVEN_DAY_MILLS);
        Map<String,Object> lastWeek = mapper.queryWeekUserCount(lastWeekDate);

        Map<String, Object> map = new HashMap<>();
        map.put("currentWeek" , currentWeek);
        map.put("lastWeek" , lastWeek);
        return map;
    }

    @Override
    public List<Map<String, Object>> queryDeviceCount() {
        return mapper.queryTotalDeviceCount();
    }

    @Override
    public JSONArray queryAmbariHosts() {
        return ambariRestService.hosts();
    }

}
