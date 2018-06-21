package com.bamboocloud.risk.chart.web.controller;

import com.bamboocloud.risk.chart.service.DashboardService;
import com.bamboocloud.risk.support.ResponseJSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    @Autowired
    DashboardService service;

    @RequestMapping("/{type}")
    public ResponseJSON query(@PathVariable("type") String type){
        switch (type){
            case "monitor" : {
                return new ResponseJSON(service.queryAmbariHosts());
            }
            case "card" : {
                return new ResponseJSON(service.queryRiskCountCards());
            }
            case "app" : {
                return new ResponseJSON(service.queryWeekAppCount());
            }
            case "user" : {
                return new ResponseJSON(service.queryWeekUserCount());
            }
            case "device" : {
                return new ResponseJSON(service.queryDeviceCount());
            }
            default : {
                return new ResponseJSON();
            }
        }
    }
}
