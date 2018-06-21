package com.bamboocloud.risk.chart.service;

import com.bamboocloud.risk.db.entity.Menu;

import java.util.List;
import java.util.Map;

public interface MenuService {
    List<Menu> query(Map<String, Object> map);

    void save(Menu menu) throws IllegalAccessException;

    void update(Menu menu) throws IllegalAccessException;

    void delete(int id);
}
