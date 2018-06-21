package com.bamboocloud.risk.chart.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.bamboocloud.risk.chart.dynamic.DynamicChartService;
import com.bamboocloud.risk.chart.dynamic.DynamicHtmlService;
import com.bamboocloud.risk.chart.dynamic.DynamicQuerySqlService;
import com.bamboocloud.risk.db.entity.DynamicChart;
import com.bamboocloud.risk.db.entity.DynamicHtml;
import com.bamboocloud.risk.db.entity.DynamicQuerySql;
import com.bamboocloud.risk.db.mapper.DynamicChartMapper;
import com.bamboocloud.risk.support.IdWorker;
import com.bamboocloud.risk.support.MapUtil;
import com.bamboocloud.risk.support.RequestUtil;
import com.bamboocloud.risk.support.StatusEnum;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

@Service
public class DynamicChartServiceImpl implements DynamicChartService {

    @Autowired
    private DynamicChartMapper mapper;

    @Autowired
    private DynamicQuerySqlService querySqlService;

    @Autowired
    private DynamicHtmlService htmlService;

    @Override
    public PageInfo<DynamicChart> query(int pageNum) {
        PageHelper.startPage(pageNum, RequestUtil.PAGE_SIZE);
        List<DynamicChart> list = mapper.queryForList(null);
        list.forEach(chart -> {
            JSONObject xAxis = JSONObject.parseObject(chart.getxAxis());
            JSONObject yAxis = JSONObject.parseObject(chart.getyAxis());
            JSONArray series = JSONArray.parseArray(chart.getSeries());

            if(xAxis.containsKey("sql")){
                flushSql(chart.getId() , "xAxis" , xAxis);
                chart.setxAxis(xAxis.toJSONString());
            }

            if(yAxis.containsKey("sql")){
                flushSql(chart.getId() , "yAxis" , yAxis);
                chart.setyAxis(yAxis.toJSONString());
            }

            for(int i = 0 ; i < series.size(); i++){
                JSONObject jObj = series.getJSONObject(i);
                if(jObj.containsKey("sql")){
                    flushSql(chart.getId() , jObj.getString("id") , jObj);
                    series.set(i , jObj);
                }
            }

            chart.setSeries(series.toJSONString());
        });
        return new PageInfo(list);
    }

    @Override
    public void update(DynamicChart chart) throws IOException, IllegalAccessException {
        DynamicChart oldChart = mapper.get(chart.getId());

        if(!oldChart.getxAxis().equals(chart.getxAxis())){
            saveAxisSql(chart.getxAxis() , chart);
        }

        if(!oldChart.getyAxis().equals(chart.getyAxis())){
            saveAxisSql(chart.getyAxis() , chart);
        }

        if(!oldChart.getSeries().equals(chart.getSeries())){
            saveSeriesSql(chart.getSeries() , chart);
        }

        htmlService.remove(chart.getHtmlId());
        DynamicHtml html = htmlService.build(JSONObject.parseObject(chart.toString()));
        chart.setHtmlId(html.getId());
        chart.setHtmlUrl(html.getUrl());

        mapper.update(chart);
    }

    @Override
    public void save(DynamicChart chart) throws IOException, IllegalAccessException {
        chart.setId(IdWorker.uuid());
        if(StringUtils.isEmpty(chart.getStatus())){
            chart.setStatus(StatusEnum.NORMAL.name());
        }

        saveAxisSql(chart.getxAxis() , chart);
        saveAxisSql(chart.getyAxis() , chart);
        saveSeriesSql(chart.getSeries() , chart);

        DynamicHtml html = htmlService.build(JSONObject.parseObject(chart.toString()));
        chart.setHtmlId(html.getId());
        chart.setHtmlUrl(html.getUrl());

        mapper.insert(chart);
    }

    @Override
    public Object loadModuleData(String chartId, String module) {
        List<DynamicQuerySql> list = querySqlService.query(MapUtil.newMap(new String[]{"chartId" , "module"} ,
                                                                          new String[]{chartId , module}));

        if(null == list || list.isEmpty()){
            return null;
        }

        DynamicQuerySql sql = list.get(0);
        return querySqlService.executeQuery(sql.getId() , new HashMap<>());
    }

    @Override
    public void delete(String id) {
        DynamicChart chart = mapper.get(id);
        if(null == chart){
            return;
        }

        htmlService.remove(chart.getHtmlId());
        querySqlService.delete(chart.getId());
        mapper.delete(chart.getId());
    }

    private void saveAxisSql(String axisString , DynamicChart chart){
        JSONObject axis = JSONObject.parseObject(axisString);
        querySqlService.delete(chart.getId() , axis.getString("id"));

        if(!"sql".equals(axis.getString("dataType"))){
            return;
        }

        JSONObject sqlJSON = axis.getJSONObject("sql");
        if(null == sqlJSON){
            throw new NullPointerException("No sql json found.");
        }

        DynamicQuerySql sql = new DynamicQuerySql(sqlJSON , chart.getId() , chart.getCreator());
        sql.setUsed(String.format("%s_%s" , chart.getText() , sql.getModule()));
        querySqlService.save(sql);
    }

    private void saveSeriesSql(String seriesString , DynamicChart chart) throws IllegalAccessException {
        JSONArray series = JSONArray.parseArray(seriesString);
        List<DynamicQuerySql> oldSqlList = querySqlService.query(MapUtil.newMap(new String[]{"chartId" , "moduleLike"} ,
                                                                                new String[]{chart.getId() , "series"}));
        oldSqlList.forEach(oldSql -> querySqlService.remove(oldSql.getId()));
        for(int i = 0 ; i < series.size(); i++){
            JSONObject jObj = series.getJSONObject(i);

            if(!"sql".equals(jObj.getString("dataType"))){
                continue;
            }

            JSONObject sqlJSON = jObj.getJSONObject("sql");
            DynamicQuerySql newSql = new DynamicQuerySql(sqlJSON , chart.getId() , chart.getCreator());

            if(chart.getType().equals("scatter")){
                if(newSql.getColumns().split(",").length != 2){
                    oldSqlList.forEach(oldSql -> querySqlService.save(oldSql));
                    throw new IllegalAccessException("Scatter must with two value fields.");
                }
            }

            newSql.setUsed(String.format("%s_%s" , chart.getText() , newSql.getModule()));
            querySqlService.save(newSql);
        }
    }

    private void flushSql(String chartId , String module , JSONObject jObj){
        DynamicQuerySql sql = querySqlService.getByChart(chartId , module);
        JSONObject sqlJSON = jObj.getJSONObject("sql");
        sqlJSON.put("columns",sql.getColumns());
        sqlJSON.put("dataSourceId",sql.getDataSourceId());
        sqlJSON.put("name",sql.getName());
        sqlJSON.put("conditions",sql.getConditions());
        sqlJSON.put("groupBy",sql.getGroupBy());
        sqlJSON.put("having",sql.getHaving());
        sqlJSON.put("orderBy",sql.getOrderBy());
        sqlJSON.put("tableName",sql.getTableName());
        sqlJSON.put("sqlString",sql.getSqlString());
        jObj.put("sql" , sqlJSON);
    }
}
