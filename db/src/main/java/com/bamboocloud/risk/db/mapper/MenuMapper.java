package com.bamboocloud.risk.db.mapper;

import com.bamboocloud.risk.db.entity.Menu;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface MenuMapper {

    List<Menu> queryForList(Map<String,Object> map);

    void insert(Menu menu);

    void update(Menu menu);

    void delete(int id);

    Menu getById(Integer parentId);

    int getCountByName(String name);

    void deleteRoleMenu(int id);
}
