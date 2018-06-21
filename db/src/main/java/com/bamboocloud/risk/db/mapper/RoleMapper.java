package com.bamboocloud.risk.db.mapper;

import com.bamboocloud.risk.db.entity.Menu;
import com.bamboocloud.risk.db.entity.Role;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface RoleMapper {

    Role getById(int id);

    List<Role> queryForList();

    void save(Role role);

    void saveRoleMenu(List<Menu> menuList);

    void deleteRoleMenu(int id);

    void delete(int id);

    void update(Role role);

    int getCountByName(String name);
}
