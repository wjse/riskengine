package com.bamboocloud.risk.chart.web.controller;

import com.bamboocloud.risk.chart.dynamic.DynamicQuerySqlService;
import com.bamboocloud.risk.chart.model.SessionMock;
import com.bamboocloud.risk.db.entity.DynamicQuerySql;
import com.bamboocloud.risk.support.ResponseJSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
@RequestMapping("/query-sql")
public class DynamicQuerySqlController {

    @Autowired
    private DynamicQuerySqlService service;

    @Autowired
    private HttpServletRequest request;

    @RequestMapping(method = RequestMethod.POST)
    public ResponseJSON save(@RequestBody DynamicQuerySql sql){
        try {
            service.save(sql.create(SessionMock.getCurrentSessionUser(request)));
            return new ResponseJSON();
        }catch (Exception e){
            return new ResponseJSON(403 , e.getMessage());
        }
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseJSON update(@RequestBody DynamicQuerySql sql){
        try {
            service.update(sql);
            return new ResponseJSON();
        }catch (Exception e){
            return new ResponseJSON(403 , e.getMessage());
        }
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

    @RequestMapping(method = RequestMethod.GET)
    public ResponseJSON query(Integer pageNum){
        return new ResponseJSON(service.query(pageNum,null));
    }

    @RequestMapping(value = "/execute/{id}" , method = RequestMethod.POST)
    public ResponseJSON execute(@PathVariable("id")int id , @RequestBody Map<String,Object> map){
        try {
            return new ResponseJSON(service.executeQuery(id, map));
        }catch (Exception e){
            return new ResponseJSON(403 , e.getMessage());
        }
    }

    @RequestMapping(value = "/sql" , method = RequestMethod.POST)
    public ResponseJSON executeSql(@RequestBody Map<String,Object> map){
        try {
            int dataSourceId = Integer.parseInt(map.get("dataSourceId").toString());
            String sql = map.get("sql").toString();
            return new ResponseJSON(service.executeQuery(dataSourceId , sql, map));
        }catch (Exception e){
            return new ResponseJSON(403 , e.getMessage());
        }
    }
}
