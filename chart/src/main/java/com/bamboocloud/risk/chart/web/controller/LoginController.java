package com.bamboocloud.risk.chart.web.controller;

import com.bamboocloud.risk.chart.model.SessionMock;
import com.bamboocloud.risk.chart.model.Token;
import com.bamboocloud.risk.chart.service.UserService;
import com.bamboocloud.risk.db.entity.User;
import com.bamboocloud.risk.support.RequestUtil;
import com.bamboocloud.risk.support.ResponseJSON;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    UserService userService;

    @Autowired
    HttpServletRequest request;

    @Autowired
    HttpServletResponse response;

    @RequestMapping(params = {"token"} , method = RequestMethod.GET)
    public boolean isLogin(String token){
        String source = Token.getSource(token);
        if(StringUtils.isEmpty(source)){
            return false;
        }
        return SessionMock.has(source);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseJSON login(@RequestBody Map<String,String> map) {
        User user = userService.getUser(map.get("username"),map.get("password"));
        if(null == user){
            return new ResponseJSON(404,"not found");
        }

        String token = Token.create(String.format("%s_%s" , user.getUsername() , user.getPassword()));
        SessionMock.put(Token.getSource(token) , user);

        String imgPath = user.getImgPath();
        if(StringUtils.isNotEmpty(imgPath) && ! imgPath.startsWith("http")){
            user.setImgPath(RequestUtil.getResourcePath(request , user.getImgPath()));
        }
        return new ResponseJSON().add("token" , token)
                                 .add("user" , user);
    }

    @RequestMapping(params = "token" , method = RequestMethod.DELETE)
    public ResponseJSON logout(String token){
        String source = Token.getSource(token);
        SessionMock.remove(source);
        return new ResponseJSON();
    }
}
