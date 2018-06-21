package com.bamboocloud.risk.chart.service.impl;

import com.bamboocloud.risk.chart.dynamic.DynamicDataSourceService;
import com.bamboocloud.risk.chart.dynamic.DynamicQuerySqlService;
import com.bamboocloud.risk.db.entity.DynamicDataSource;
import com.bamboocloud.risk.db.entity.DynamicQuerySql;
import com.bamboocloud.risk.db.mapper.DynamicDataSourceMapper;
import com.bamboocloud.risk.support.MapUtil;
import com.bamboocloud.risk.support.PropertiesUtil;
import com.bamboocloud.risk.support.RequestUtil;
import com.bamboocloud.risk.support.StatusEnum;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.apache.commons.dbcp.BasicDataSource;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.support.BeanDefinitionBuilder;
import org.springframework.beans.factory.support.DefaultListableBeanFactory;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.regex.Pattern;

@Service
public class DynamicDataSourceServiceImpl implements DynamicDataSourceService {

    private static final String[] DEFAULT_DRIVERS = { "com.mysql.jdbc.Driver" ,
                                                      "oracle.jdbc.driver.OracleDriver",
                                                      "com.microsoft.sqlserver.jdbc.SQLServerDriver"};

    private static final Map<String,String> URL_PROPS = MapUtil.propertiesToMap(PropertiesUtil.of("dynamic_config.properties"));

    @Autowired
    private ConfigurableApplicationContext context;

    @Autowired
    private DynamicDataSourceMapper mapper;

    @Autowired
    private DynamicQuerySqlService sqlService;

    @Override
    public void save(DynamicDataSource dataSource) {
        if(missRequireArgs(dataSource)){
            throw new IllegalArgumentException("Missing require arguments.");
        }

        matchDriver(dataSource);
        buildUrl(dataSource);
        mapper.insert(dataSource);

        if(dataSource.getStatus() == StatusEnum.STARTUP){
            startUp(dataSource);
        }
    }

    @Override
    public void update(DynamicDataSource dataSource) {
        if(Objects.isNull(dataSource.getId()) || missRequireArgs(dataSource)){
            throw new IllegalArgumentException("Missing require arguments.");
        }

        matchDriver(dataSource);
        buildUrl(dataSource);
        mapper.update(dataSource);
    }

    @Override
    public void delete(int id) throws IllegalAccessException{
        if(sqlService.getCountByDataSource(id) > 0){
            throw new IllegalAccessException("This dynamic data source until used.");
        }
        shutdown(id , true);
        mapper.delete(id);
    }

    @Override
    public PageInfo<DynamicDataSource> query(int pageNum , Map<String, Object> map) {
        return PageHelper.startPage(pageNum, RequestUtil.PAGE_SIZE).doSelectPageInfo(() -> mapper.queryForList(map));
    }

    @Override
    public List<DynamicDataSource> query(Map<String,Object> map){
        return mapper.queryForList(map);
    }

    @Override
    public void startUp(int id) {
        startUp(Objects.requireNonNull(mapper.get(id)));
    }

    @Override
    public void startUp(List<DynamicDataSource> list) {
        if(null == list || list.isEmpty()){
            return;
        }

        list.forEach(ds -> startUp(ds));
    }

    @Override
    public void shutdown(int id , boolean isDelete) {
        shutdown(Objects.requireNonNull(mapper.get(id)) , isDelete);
    }

    @Override
    public void shutdown(List<Integer> idList , boolean isDelete) {
        Map<String,Object> map = MapUtil.newMap(new String[]{"idList"}, new Object[]{idList});
        List<DynamicDataSource> list = query(map);

        if(null == list || list.isEmpty()){
            return;
        }

        list.forEach(ds -> shutdown(ds , isDelete));
    }

    @Override
    public String getDynamicDataSourceBeanName(DynamicDataSource ds){
        return String.format("%s.%s.%s.%s:%s" , ds.getType()
                , ds.getHost() , ds.getPort()
                , ds.getDbName() , ds.getId());
    }

    @Override
    public DynamicDataSource get(int id) {
        return mapper.get(id);
    }

    @Override
    public BasicDataSource getBasicDataSource(int id) {
        return getBasicDataSource(Objects.requireNonNull(get(id)));
    }

    @Override
    public BasicDataSource getBasicDataSource(DynamicDataSource dataSource) {
        String beanName = getDynamicDataSourceBeanName(dataSource);
        return context.getBean(beanName , BasicDataSource.class);
    }

    @PostConstruct
    private void startUp() {
        List<DynamicDataSource> list = query(MapUtil.newMap(new String[]{"status"} , new Object[]{StatusEnum.STARTUP}));
        if(null == list || list.isEmpty()){
            return;
        }

        startUp(list);
    }

    private void startUp(DynamicDataSource ds){
        DefaultListableBeanFactory beanFactory = (DefaultListableBeanFactory) context.getBeanFactory();
        BeanDefinitionBuilder builder = BeanDefinitionBuilder.genericBeanDefinition(BasicDataSource.class);

        setPropertiesOfBeanDefinition(builder , ds);
        beanFactory.registerBeanDefinition(getDynamicDataSourceBeanName(ds) , builder.getRawBeanDefinition());

        if(ds.getStatus() != StatusEnum.STARTUP){
            ds.setStatus(StatusEnum.STARTUP);
            mapper.update(ds);
        }
    }

    private void setPropertiesOfBeanDefinition(BeanDefinitionBuilder builder , DynamicDataSource ds){
        builder.addPropertyValue("username" , ds.getUsername());
        builder.addPropertyValue("password" , ds.getPassword());
        builder.addPropertyValue("url" , ds.getUrl());
        builder.addPropertyValue("driverClassName" , ds.getDriver());
    }

    private void shutdown(DynamicDataSource ds , boolean isDelete){
        final String beanName = getDynamicDataSourceBeanName(ds);
        if(!context.containsBean(beanName)){
            return;
        }

        DefaultListableBeanFactory beanFactory = (DefaultListableBeanFactory) context.getBeanFactory();
        beanFactory.removeBeanDefinition(beanName);

        if(!isDelete){
            ds.setStatus(StatusEnum.SHUTDOWN);
            mapper.update(ds);
        }
    }

    private boolean missRequireArgs(DynamicDataSource ds) {
        if(null == ds){
            return true;
        }

        return StringUtils.isEmpty(ds.getName()) || StringUtils.isEmpty(ds.getType()) ||
                StringUtils.isEmpty(ds.getHost()) || StringUtils.isEmpty(ds.getDbName()) || StringUtils.isEmpty(ds.getPort()) ||
                StringUtils.isEmpty(ds.getUsername()) || StringUtils.isEmpty(ds.getPassword());
    }

    private void buildUrl(DynamicDataSource ds) {
        final String type = ds.getType();
        String urlTemplate = Objects.requireNonNull(URL_PROPS.get(type));

        String url = urlTemplate.replace("[host]" , ds.getHost())
                                .replace("[port]",ds.getPort())
                                .replace("[dbName]" , ds.getDbName());
        ds.setUrl(url);
    }

    private void matchDriver(DynamicDataSource ds){
        final String type = ds.getType();

        Pattern pattern;
        for(String driver : DEFAULT_DRIVERS){
            pattern = Pattern.compile(String.format("^(.)*%s(.)*" , type.toLowerCase()));

            if(pattern.matcher(driver).find()){
                ds.setDriver(driver);
                break;
            }
        }

        Objects.requireNonNull(ds.getDriver() , String.format("No driver found by this type : [%s]" , type));
    }
}
