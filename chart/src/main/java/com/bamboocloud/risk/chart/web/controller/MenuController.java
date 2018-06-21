package com.bamboocloud.risk.chart.web.controller;

import com.bamboocloud.risk.chart.service.MenuService;
import com.bamboocloud.risk.db.entity.Menu;
import com.bamboocloud.risk.support.RequestUtil;
import com.bamboocloud.risk.support.ResponseJSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/menu")
public class MenuController {

    @Autowired
    private MenuService service;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseJSON list(HttpServletRequest request){
        return new ResponseJSON(service.query(RequestUtil.parameterMap(request)));
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseJSON save(@RequestBody Menu menu){
        try {
            service.save(menu);
        } catch (IllegalAccessException e) {
            return new ResponseJSON(ResponseJSON.FORBIDDEN , "Name already existed");
        }
        return new ResponseJSON();
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseJSON update(@RequestBody Menu menu){
        try {
            service.update(menu);
        } catch (IllegalAccessException e) {
            return new ResponseJSON(ResponseJSON.FORBIDDEN , "Name already existed");
        }
        return new ResponseJSON();
    }

    @RequestMapping(value = "/{id}" , method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") int id){
        service.delete(id);
    }
}
