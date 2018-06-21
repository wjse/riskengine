package com.bamboocloud.risk.chart.service.impl;

import com.bamboocloud.risk.chart.dynamic.DynamicDataSourceService;
import com.bamboocloud.risk.chart.dynamic.DynamicQuerySqlService;
import com.bamboocloud.risk.db.entity.DynamicQuerySql;
import com.bamboocloud.risk.db.mapper.DynamicChartMapper;
import com.bamboocloud.risk.db.mapper.DynamicQuerySqlMapper;
import com.bamboocloud.risk.support.RequestUtil;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.apache.commons.dbcp.BasicDataSource;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class DynamicQuerySqlServiceImpl implements DynamicQuerySqlService {

    private static Logger logger = LoggerFactory.getLogger(DynamicQuerySqlServiceImpl.class.getName());

    @Autowired
    private DynamicQuerySqlMapper mapper;

    @Autowired
    private DynamicChartMapper chartMapper;

    @Autowired
    private DynamicDataSourceService dataSourceService;

    @Override
    public void save(DynamicQuerySql sql) {
        if (isMissingRequireArgs(sql)) {
            throw new IllegalArgumentException("Missing required arguments.");
        }

        sql.setSqlString(buildQuerySql(sql));
        mapper.insert(sql);
    }

    @Override
    public void update(DynamicQuerySql sql) {
        if(isMissingRequireArgs(sql) || null == sql.getId()){
            throw new IllegalArgumentException("Missing required arguments.");
        }

        sql.setSqlString(buildQuerySql(sql));
        mapper.update(sql);
    }

    @Override
    public void remove(int id) {
        mapper.delete(id);
    }

    @Override
    public void delete(int id) throws IllegalAccessException {
        DynamicQuerySql sql = mapper.get(id);
        if(null == sql){
            return;
        }

        if(chartMapper.getCountById(sql.getChartId()) > 0){
            throw new IllegalAccessException("This dynamic query sql until used.");
        }
        mapper.delete(id);
    }

    @Override
    public void delete(String chartId, String module) {
        mapper.deleteByChartAndModule(chartId , module);
    }

    @Override
    public void delete(String chartId) {
        mapper.deleteByChart(chartId);
    }

    @Override
    public DynamicQuerySql get(int id) {
        return mapper.get(id);
    }

    @Override
    public PageInfo<DynamicQuerySql> query(int pageNum , Map<String , Object> map) {
        return PageHelper.startPage(pageNum, RequestUtil.PAGE_SIZE).doSelectPageInfo(() -> mapper.queryForList(map));
    }

    @Override
    public List<DynamicQuerySql> query(Map<String, Object> map) {
        return mapper.queryForList(map);
    }

    @Override
    public List<Map<String,Object>> executeQuery(int id , Map<String,Object> map) {
        DynamicQuerySql sql = get(id);
        if(null == sql || null == sql.getDataSourceId()){
            throw new IllegalArgumentException("Missing required arguments.");
        }

        return executeQuery(sql.getDataSourceId() , buildQuerySql(sql) , map);
    }

    @Override
    public List<Map<String, Object>> executeQuery(int dataSourceId , String sql, Map<String, Object> map) {
        BasicDataSource dataSource = Objects.requireNonNull(dataSourceService.getBasicDataSource(dataSourceId) ,
                                                    "BasicDataSource not load in context.");

        Connection connection = null;
        PreparedStatement ps = null;
        try {
            connection = dataSource.getConnection();

            ConditionMatcher cm = parseConditions(sql);
            ps = connection.prepareStatement(cm.sql);

            if(cm.hasConditions()){
                for(int i = 1 ; i <= cm.count ; i++){
                    ps.setObject(i , map.get(cm.map.get(i)));
                }
            }

            ResultSet rs = ps.executeQuery();
            String[] columnNames = getTableColumnNames(rs);
            List<Map<String,Object>> list = new ArrayList<>();
            while (rs.next()){
                Map<String,Object> data = new HashMap<>();
                for(String columnName : columnNames){
                    data.put(columnName , rs.getObject(columnName) == null ? "" : rs.getObject(columnName));
                }

                if(logger.isDebugEnabled()){
                    logger.debug("ResultSet => %s" , data);
                }
                list.add(data);
            }

            return list;
        } catch (SQLException e) {
            throw new RuntimeException("Execute query thrown SQLException" , e);
        }finally {
            try{
                if(null != ps){
                    ps.close();
                }

                if(null != connection){
                    connection.close();
                }
            }catch (SQLException e){}
        }
    }

    @Override
    public int getCountByDataSource(int id) {
        return mapper.getCountByDataSource(id);
    }

    @Override
    public DynamicQuerySql getByChart(String chartId, String module) {
        return mapper.getByChart(chartId , module);
    }

    /**
     * 通过源数据获取列名
     * @param rs
     * @return
     * @throws SQLException
     */
    private String[] getTableColumnNames(ResultSet rs) throws SQLException {
        ResultSetMetaData md = rs.getMetaData();
        String[] array = new String[md.getColumnCount()];
        for(int i = 0 ; i < array.length ; i++){
            array[i] = md.getColumnName(i + 1);
        }
        return array;
    }

    /**
     * 解析查询条件，并将带有查询条件的sql转换为预编译sql
     * 返回条件匹配对象
     * 该对象：
     * count表示有几个条查询条件
     * map表示第几个查询条件映射的变量名
     * sql表示替换过后的预编译sql，如无条件查询则为原sql
     * @param sourceSql 原sql
     * @return ConditionMatcher
     */
    private ConditionMatcher parseConditions(String sourceSql){
        ConditionMatcher cm = new ConditionMatcher();
        if(StringUtils.isEmpty(sourceSql)){
            return cm;
        }
        Pattern p = Pattern.compile("[:][\\w]+[\\s]?" , Pattern.CASE_INSENSITIVE);
        Matcher m = p.matcher(sourceSql);
        while(m.find()){
            cm.count += 1;
            cm.map.put(cm.count , m.group().replace(":",""));
        }

        cm.sql = sourceSql.replaceAll("[:][\\w]+" , "?");
        return cm;
    }

    /**
     * 构建sql语句
     * @param sql
     * @return
     */
    private String buildQuerySql(DynamicQuerySql sql){
        StringBuffer buffer = new StringBuffer("select ");
        buffer.append(sql.getColumns().toLowerCase());
        buffer.append("\n from ");
        buffer.append(sql.getTableName());

        if(StringUtils.isNotEmpty(sql.getConditions())){
            buffer.append("\n where ").append(sql.getConditions());
        }

        if(StringUtils.isNotEmpty(sql.getGroupBy())){
            buffer.append("\n group by ").append(sql.getGroupBy());
        }

        if(StringUtils.isNotEmpty(sql.getHaving())){
            buffer.append("\n having ").append(sql.getHaving());
        }

        if(StringUtils.isNotEmpty(sql.getOrderBy())){
            buffer.append("\n order by ").append(sql.getOrderBy());
        }

        String sqlString = buffer.toString();
        if(logger.isDebugEnabled()){
            logger.debug(String.format("Built sql is => %s" , sqlString));
        }

        return sqlString;
    }

    /**
     * 参数校验
     * 参数校验
     * @param sql
     * @return
     */
    private boolean isMissingRequireArgs(DynamicQuerySql sql) {
        if(null == sql){
            return true;
        }

        return Objects.isNull(sql.getName()) || Objects.isNull(sql.getColumns()) ||
               Objects.isNull(sql.getTableName()) || Objects.isNull(sql.getDataSourceId());
    }

    /**
     * 带有条件查询语句匹配对象
     */
    class ConditionMatcher{
        int count = 0;
        Map<Integer,String> map = new HashMap<>();
        String sql;

        boolean hasConditions(){
            return count > 0;
        }
    }
}
