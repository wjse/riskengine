package com.bamboocloud.risk.rest.api;

import com.bamboocloud.risk.db.entity.UserPasswordWrong;
import com.bamboocloud.risk.rest.UserPasswordService;
import com.bamboocloud.risk.rest.model.UserErrorModel;
import com.bamboocloud.risk.support.ResponseJSON;
import com.bamboocloud.risk.user.UserPasswordWrongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

/**
 * 用户密码错误记录接口
 */
@RestController
@RequestMapping(UserPasswordService.PATH)
public class UserPasswordServiceApi implements UserPasswordService {

    @Autowired
    UserPasswordWrongService userPasswordWrongService;

    @RequestMapping(method = RequestMethod.POST)
    @Override
    public ResponseJSON wrong(@RequestBody UserErrorModel userError) {
        userPasswordWrongService.save(new UserPasswordWrong(userError.getUserId(),new Date()));
        return new ResponseJSON();
    }
}
