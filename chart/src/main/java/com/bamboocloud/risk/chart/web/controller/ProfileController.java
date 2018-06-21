package com.bamboocloud.risk.chart.web.controller;

import com.bamboocloud.risk.chart.service.UserService;
import com.bamboocloud.risk.db.entity.User;
import com.bamboocloud.risk.support.EncryptUtil;
import com.bamboocloud.risk.support.ResponseJSON;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/profile")
public class ProfileController {

    @Autowired
    private UserService userService;

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseJSON updateProfile(@RequestBody User user){
        try {
            userService.update(user);
        } catch (NotFoundException e) {
            return new ResponseJSON(404,"User not found");
        } catch (IllegalAccessException e) {
            return new ResponseJSON(403 , "Username existed");
        }
        return new ResponseJSON();
    }

    @RequestMapping(value = "/password/{id}" , method = RequestMethod.PUT)
    public ResponseJSON updatePassowrd(@PathVariable("id") int id, @RequestBody Map<String,String> map){

        String sourcePassword = map.get("sourcePassword") , password = map.get("password");

        if(StringUtils.isAnyEmpty(sourcePassword,password)){
            return new ResponseJSON(500 , "invalidate parameters");
        }

        User user = userService.getUser(id , true);
        if(null == user){
            return new ResponseJSON(404,"user not found");
        }

        if(!user.getPassword().equals(EncryptUtil.hex(sourcePassword, "SHA1"))){
            return new ResponseJSON(403,"source password wrong");
        }

        user.setPassword(EncryptUtil.hex(password,"SHA1"));
        try {
            userService.update(user);
        }  catch (NotFoundException e) {
            return new ResponseJSON(404,"User not found");
        } catch (IllegalAccessException e) {
            return new ResponseJSON(403 , "Username existed");
        }
        return new ResponseJSON();
    }
}
