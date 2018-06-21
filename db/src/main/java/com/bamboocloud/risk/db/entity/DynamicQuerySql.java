package com.bamboocloud.risk.db.entity;

import com.alibaba.fastjson.JSONObject;

import java.util.Date;

/**
 * 动态查询sql实体
 */
public class DynamicQuerySql {
    private Integer id;
    private String name;
    private String used;
    private String columns;
    private String tableName;
    private String conditions;
    private String groupBy;
    private String having;
    private String orderBy;
    private String sqlString;
    private String chartId;
    private String module;
    private Integer dataSourceId;
    private DynamicDataSource dataSource;
    private String creator;
    private Date createTime;

    public DynamicQuerySql(){}

    public DynamicQuerySql(JSONObject sqlJSON , String chartId , String creator){
        this.name = sqlJSON.getString("name");
        this.columns = sqlJSON.getString("columns");
        this.tableName = sqlJSON.getString("tableName");
        this.conditions = sqlJSON.getString("conditions");
        this.groupBy = sqlJSON.getString("groupBy");
        this.having = sqlJSON.getString("having");
        this.orderBy = sqlJSON.getString("orderBy");
        this.module = sqlJSON.getString("module");
        this.dataSourceId = sqlJSON.getInteger("dataSourceId");
        this.chartId = chartId;
        this.creator = creator;
        this.createTime = new Date();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Integer getDataSourceId() {
        return dataSourceId;
    }

    public void setDataSourceId(Integer dataSourceId) {
        this.dataSourceId = dataSourceId;
    }

    public String getColumns() {
        return columns;
    }

    public void setColumns(String columns) {
        this.columns = columns;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public String getConditions() {
        return conditions;
    }

    public void setConditions(String conditions) {
        this.conditions = conditions;
    }

    public DynamicDataSource getDataSource() {
        return dataSource;
    }

    public void setDataSource(DynamicDataSource dataSource) {
        this.dataSource = dataSource;
    }

    public String getGroupBy() {
        return groupBy;
    }

    public void setGroupBy(String groupBy) {
        this.groupBy = groupBy;
    }

    public String getHaving() {
        return having;
    }

    public void setHaving(String having) {
        this.having = having;
    }

    public String getOrderBy() {
        return orderBy;
    }

    public void setOrderBy(String orderBy) {
        this.orderBy = orderBy;
    }

    public String getSqlString() {
        return sqlString;
    }

    public void setSqlString(String sqlString) {
        this.sqlString = sqlString;
    }

    public String getChartId() {
        return chartId;
    }

    public void setChartId(String chartId) {
        this.chartId = chartId;
    }

    public String getModule() {
        return module;
    }

    public void setModule(String module) {
        this.module = module;
    }

    public String getUsed() {
        return used;
    }

    public void setUsed(String used) {
        this.used = used;
    }

    public DynamicQuerySql create(User user){
        setCreateTime(new Date());
        setCreator(user.getUsername());
        return this;
    }
}
