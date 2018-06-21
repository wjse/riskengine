package com.bamboocloud.risk.chart.web.controller;

import com.bamboocloud.risk.chart.service.RiskChartService;
import com.bamboocloud.risk.support.ResponseJSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/risk")
public class RiskChartController {

    @Autowired
    private RiskChartService service;

    @RequestMapping(value = "/access-{type}" , method = RequestMethod.GET , params = {"timeType"})
    public ResponseJSON accessResult(@PathVariable("type")String type ,  int timeType){
        if("result".equals(type)){
            return new ResponseJSON(service.queryAccessResult(timeType));
        }else if("city".equals(type)){
            return new ResponseJSON(service.queryAccessCity(timeType));
        }else{
            return new ResponseJSON(404);
        }
    }

    @RequestMapping(value = "/access-result-day" , method = RequestMethod.GET)
    public ResponseJSON accessResultDay(Long startDate , Long endDate) {
        return new ResponseJSON(service.queryAccessResultDay(startDate , endDate));
    }

    @RequestMapping(value = "/rule-{type}" ,method = RequestMethod.GET , params = {"timeType"})
    public ResponseJSON ruleCount(@PathVariable("type")String type ,  int timeType){
        return new ResponseJSON(service.queryRuleRiskCount(type,timeType));
    }

    @RequestMapping(value = "/rule-{type}-day" ,method = RequestMethod.GET)
    public ResponseJSON ruleCountDay(@PathVariable("type")String type ,  Long startDate , Long endDate){
        return new ResponseJSON(service.queryRuleRiskCountDay(type,startDate,endDate));
    }
}
