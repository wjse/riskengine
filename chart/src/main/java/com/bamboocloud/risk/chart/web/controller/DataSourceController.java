package com.bamboocloud.risk.chart.web.controller;

import com.bamboocloud.risk.chart.dynamic.DynamicDataSourceService;
import com.bamboocloud.risk.chart.model.SessionMock;
import com.bamboocloud.risk.db.entity.DynamicDataSource;
import com.bamboocloud.risk.support.RequestUtil;
import com.bamboocloud.risk.support.ResponseJSON;
import com.bamboocloud.risk.support.StatusEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/data-source")
public class DataSourceController {

    @Autowired
    private DynamicDataSourceService service;

    @Autowired
    private HttpServletRequest request;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseJSON list(Integer pageNum){
        if(null == pageNum){
            return new ResponseJSON(service.query(RequestUtil.parameterMap(request)));
        }
        return new ResponseJSON(service.query(pageNum , RequestUtil.parameterMap(request)));
    }

    @RequestMapping(method = RequestMethod.POST)
    public void save(@RequestBody DynamicDataSource dataSource){
        service.save(dataSource.create(SessionMock.getCurrentSessionUser(request)));
    }

    @RequestMapping(value = "/status/{id}" , params = {"status"} , method = RequestMethod.PUT)
    public void updateStatus(@PathVariable("id")int id , String status){
        if (StatusEnum.STARTUP.name().equals(status)) {
            service.startUp(id);
        } else {
            service.shutdown(id , false);
        }
    }

    @RequestMapping(method = RequestMethod.PUT)
    public void update(@RequestBody DynamicDataSource dataSource){
        service.update(dataSource);
    }

    @RequestMapping(value = "/{id}" , method = RequestMethod.DELETE)
    public ResponseJSON delete(@PathVariable("id") int id){
        try {
            service.delete(id);
            return new ResponseJSON();
        } catch (IllegalAccessException e) {
            return new ResponseJSON(403 , e.getMessage());
        }
    }
}
