package com.bamboocloud.risk.chart.web.controller;

import com.alibaba.fastjson.JSONArray;
import com.bamboocloud.risk.chart.service.RoleService;
import com.bamboocloud.risk.db.entity.Menu;
import com.bamboocloud.risk.db.entity.Role;
import com.bamboocloud.risk.support.ResponseJSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/role")
public class RoleController {

    @Autowired
    private RoleService service;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseJSON list(){
        return new ResponseJSON(service.query());
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseJSON save(@RequestBody Map<String,Object> map){
        if(!map.containsKey("name")){
            return new ResponseJSON(ResponseJSON.PARAMETER_WRONG , "name is null");
        }

        Role role = new Role();
        role.setName(map.get("name").toString());

        setRoleMenuList(map , role);

        try {
            service.save(role);
        } catch (IllegalAccessException e) {
            return new ResponseJSON(ResponseJSON.FORBIDDEN,"name already existed");
        }
        return new ResponseJSON();
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseJSON update(@RequestBody Map<String,Object> map){
        if(!map.containsKey("name") || !map.containsKey("id")){
            return new ResponseJSON(ResponseJSON.PARAMETER_WRONG , "Missing required parameter");
        }

        Role role = new Role();
        role.setId(Integer.parseInt(map.get("id").toString()));
        role.setName(map.get("name").toString());

        setRoleMenuList(map , role);

        try {
            service.update(role);
        } catch (IllegalAccessException e) {
            return new ResponseJSON(ResponseJSON.FORBIDDEN,"name already existed");
        }
        return new ResponseJSON();
    }

    private void setRoleMenuList(Map<String,Object> map , Role role){
        if(map.containsKey("menuIds")){
            JSONArray array = (JSONArray) map.get("menuIds");
            List<Menu> menuList = new ArrayList<>();
            for(int i = 0 ; i < array.size() ; i++){
                Menu menu = new Menu();

                if(null != role.getId()){
                    menu.setRoleId(role.getId());
                }

                menu.setId(array.getInteger(i));
                menuList.add(menu);
            }

            role.setMenuList(menuList);
        }
    }

    @RequestMapping(value = "/{id}" , method = RequestMethod.DELETE)
    public ResponseJSON delete(@PathVariable("id") int id){
        try {
            service.delete(id);
        } catch (IllegalAccessException e) {
            return new ResponseJSON(ResponseJSON.FORBIDDEN , "Role in used");
        }

        return new ResponseJSON();
    }
}
