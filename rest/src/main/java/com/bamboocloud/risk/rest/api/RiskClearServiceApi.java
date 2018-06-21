package com.bamboocloud.risk.rest.api;

import com.bamboocloud.risk.db.entity.UserPasswordWrong;
import com.bamboocloud.risk.rest.RiskClearService;
import com.bamboocloud.risk.rest.UserPasswordService;
import com.bamboocloud.risk.rest.model.UserErrorModel;
import com.bamboocloud.risk.support.ResponseJSON;
import com.bamboocloud.risk.user.UserPasswordWrongService;
import com.bamboocloud.risk.user.UserRiskAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

/**
 * 用户风险清除接口
 */
@RestController
@RequestMapping(RiskClearService.PATH)
public class RiskClearServiceApi implements RiskClearService {

    @Autowired
    UserRiskAccountService service;

    @RequestMapping(method = RequestMethod.POST)
    @Override
    public ResponseJSON riskClear(String userId) {
        service.deleteUserRisk(userId);
        return new ResponseJSON();
    }
}
