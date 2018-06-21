package com.bamboocloud.risk.chart.web.controller;

import com.bamboocloud.risk.chart.service.StatisticsChartService;
import com.bamboocloud.risk.support.MapUtil;
import com.bamboocloud.risk.support.ResponseJSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/statistics")
public class StatisticsChartController {

    @Autowired
    private StatisticsChartService service;

    @Autowired
    private HttpServletRequest request;

    @RequestMapping(value = "/active-time-quantum" , method = RequestMethod.GET)
    public ResponseJSON activeTimeQuantum(){
        return new ResponseJSON(service.queryActiveTimeQuantum());
    }

    @RequestMapping(value = "/ip-portrayal-count" , params = {"showCount" , "type"}, method = RequestMethod.GET)
    public ResponseJSON ipPortrayalCount(int showCount , int type){
        return new ResponseJSON(service.queryIpPortrayalCount(MapUtil.newMap(new String[]{"rowNum" , "type"} ,
                                                                             new Integer[]{showCount,type})));
    }

    @RequestMapping(value = "/risk-user-stat" , method = RequestMethod.GET)
    public ResponseJSON riskUserStat(Integer pageNum){
        return new ResponseJSON(service.queryUserRiskAccount(pageNum));
    }

    @RequestMapping(value = "/risk-user-stat/{id}" , method = RequestMethod.DELETE)
    public ResponseJSON deleteRiskUserStat(@PathVariable("id")int id){
        service.deleteRiskUserAccount(id);
        return new ResponseJSON();
    }
}
