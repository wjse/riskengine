package com.bamboocloud.risk.chart.service;

import com.bamboocloud.risk.db.entity.Role;

import java.util.List;

public interface RoleService {
    List<Role> query();

    void save(Role role) throws IllegalAccessException;

    void delete(int id) throws IllegalAccessException;

    void update(Role role) throws IllegalAccessException;
}
