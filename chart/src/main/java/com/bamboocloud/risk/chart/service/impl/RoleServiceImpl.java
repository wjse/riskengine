package com.bamboocloud.risk.chart.service.impl;

import com.bamboocloud.risk.chart.service.RoleService;
import com.bamboocloud.risk.db.entity.Role;
import com.bamboocloud.risk.db.mapper.RoleMapper;
import com.bamboocloud.risk.db.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleMapper mapper;

    @Autowired
    private UserMapper userMapper;

    @Override
    public List<Role> query() {
        return mapper.queryForList();
    }

    @Override
    public void save(Role role) throws IllegalAccessException {

        int count = mapper.getCountByName(role.getName());

        if(count != 0){
            throw new IllegalAccessException("Role name already existed");
        }

        mapper.save(role);

        if(role.getMenuList() != null && role.getMenuList().size() > 0){
            role.getMenuList().forEach(menu -> menu.setRoleId(role.getId()));
            mapper.saveRoleMenu(role.getMenuList());
        }
    }

    @Override
    public void delete(int id) throws IllegalAccessException {

        int count = userMapper.getCountByRoleId(id);
        if(0 != count){
            throw new IllegalAccessException("This role used by someone");
        }
        mapper.delete(id);
        mapper.deleteRoleMenu(id);
        userMapper.updateRole(id);
    }

    @Override
    public void update(Role role) throws IllegalAccessException {
        Role oldRole = mapper.getById(role.getId());
        if(null == oldRole){
            throw new IllegalArgumentException("Role not found");
        }

        if(!oldRole.getName().equals(role.getName()) && 0 != mapper.getCountByName(role.getName())){
            throw new IllegalAccessException("Role name already existed");
        }

        mapper.update(role);

        if(null != role.getMenuList() && role.getMenuList().size() > 0){
            mapper.deleteRoleMenu(role.getId());
            mapper.saveRoleMenu(role.getMenuList());
        }
    }
}
