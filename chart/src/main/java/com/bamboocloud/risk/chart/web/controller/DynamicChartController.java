package com.bamboocloud.risk.chart.web.controller;

import com.bamboocloud.risk.chart.dynamic.DynamicChartService;
import com.bamboocloud.risk.chart.model.SessionMock;
import com.bamboocloud.risk.db.entity.DynamicChart;
import com.bamboocloud.risk.support.ResponseJSON;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/dynamic/chart")
public class DynamicChartController {

    @Autowired
    HttpServletRequest request;

    @Autowired
    private DynamicChartService service;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseJSON list(int pageNum){
        return new ResponseJSON(service.query(pageNum));
    }

    public ResponseJSON get(){
        return null;
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseJSON save(@RequestBody DynamicChart chart){
        try {
            if (StringUtils.isNotBlank(chart.getId())) {
                service.update(chart);
            } else {
                service.save(chart.create(SessionMock.getCurrentSessionUser(request)));
            }
            return new ResponseJSON();
        }catch (Exception e){
            return new ResponseJSON(ResponseJSON.SERVER_ERROR , e.getMessage());
        }
    }

    @RequestMapping(value = "/{id}" , method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") String id){
        service.delete(id);
    }

    @RequestMapping(value = "/data/{chartId}/{module}" , method = RequestMethod.GET)
    public Object loadData(@PathVariable("chartId")String chartId , @PathVariable("module")String module){
        return service.loadModuleData(chartId , module);
    }
}
