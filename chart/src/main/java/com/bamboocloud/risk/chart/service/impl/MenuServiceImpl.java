package com.bamboocloud.risk.chart.service.impl;

import com.bamboocloud.risk.chart.service.MenuService;
import com.bamboocloud.risk.db.entity.Menu;
import com.bamboocloud.risk.db.mapper.MenuMapper;
import com.bamboocloud.risk.support.MapUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class MenuServiceImpl implements MenuService {

    @Autowired
    private MenuMapper mapper;

    @Override
    public List<Menu> query(Map<String, Object> map) {
        return mapper.queryForList(map);
    }

    @Override
    public void save(Menu menu) throws IllegalAccessException {
        if(StringUtils.isEmpty(menu.getName()) || StringUtils.isEmpty(menu.getPath())){
            throw new IllegalArgumentException("Missing required args.");
        }

        int count = mapper.getCountByName(menu.getName());

        if(0 != count){
            throw new IllegalAccessException("Menu name is already existed");
        }

        if(null != menu.getParentId()){
            Menu parent = mapper.getById(menu.getParentId());
            if(null == parent){
                throw new IllegalAccessException("Parent menu not found");
            }

            if(!parent.isHasChildren()){
                parent.setHasChildren(true);
                mapper.update(parent);
            }
        }

        mapper.insert(menu);
    }

    @Override
    public void update(Menu menu) throws IllegalAccessException {
        if(StringUtils.isEmpty(menu.getName()) || StringUtils.isEmpty(menu.getPath())){
            throw new IllegalArgumentException("Missing required args.");
        }

        Menu oldMenu = mapper.getById(menu.getId());

        if(!oldMenu.getName().equals(menu.getName()) && 0 != mapper.getCountByName(menu.getName())){
            throw new IllegalAccessException("Menu name is already existed");
        }

        mapper.update(menu);
    }

    @Override
    public void delete(int id) {
        Menu menu = mapper.getById(id);
        if(null == menu){
            return;
        }

        List<Menu> children = mapper.queryForList(MapUtil.newMap(new String[]{"parentId"} , new Object[]{id}));

        if(null != children && !children.isEmpty()){
            children.forEach((m) -> mapper.delete(m.getId()));
        }
        mapper.delete(id);
        mapper.deleteRoleMenu(id);
    }
}
