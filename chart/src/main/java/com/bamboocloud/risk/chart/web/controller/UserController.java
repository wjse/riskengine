package com.bamboocloud.risk.chart.web.controller;

import com.bamboocloud.risk.chart.service.UserService;
import com.bamboocloud.risk.db.entity.User;
import com.bamboocloud.risk.support.RequestUtil;
import com.bamboocloud.risk.support.ResponseJSON;
import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private HttpServletRequest request;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseJSON list(Integer pageNum){
        return new ResponseJSON(userService.query(pageNum , RequestUtil.parameterMap(request)));
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseJSON save(@RequestBody User user){
        try {
            userService.insert(user);
        } catch (IllegalAccessException e) {
            return new ResponseJSON(403 , "Username existed");
        }
        return new ResponseJSON();
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseJSON update(@RequestBody User user){
        try {
            userService.update(user);
        } catch (NotFoundException e) {
            return new ResponseJSON(404,"User not found");
        } catch (IllegalAccessException e) {
            return new ResponseJSON(403 , "Username existed");
        }
        return new ResponseJSON();
    }

    @RequestMapping(value = "/{id}" , method = RequestMethod.DELETE)
    public ResponseJSON delete(@PathVariable("id")int id , HttpSession session){
        try {
            userService.delete(id , session);
        } catch (IllegalAccessException e) {
            return new ResponseJSON(403,"Unknown error");
        }
        return new ResponseJSON();
    }

    @RequestMapping(value = "/password/{id}" , method = RequestMethod.PUT)
    public ResponseJSON resetPassword(@PathVariable("id") int id){
        User user = new User();
        user.setId(id);
        user.setPassword(UserService.DEFAULT_PASSWORD);
        try {
            userService.update(user);
        } catch (NotFoundException e) {
            return new ResponseJSON(ResponseJSON.NOT_FOUND, " User not found");
        } catch (IllegalAccessException e) {}

        return new ResponseJSON();
    }
}
