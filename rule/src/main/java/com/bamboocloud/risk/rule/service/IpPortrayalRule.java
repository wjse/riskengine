package com.bamboocloud.risk.rule.service;

import com.bamboocloud.risk.db.entity.Rule;
import com.bamboocloud.risk.support.BeanHandler;
import com.bamboocloud.risk.user.UserRiskAccountService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * IP画像用户处理
 */
public class IpPortrayalRule {

    private static final Logger logger = LoggerFactory.getLogger(IpPortrayalRule.class);
    private UserRiskAccountService service = BeanHandler.getBean(UserRiskAccountService.class);

    public boolean hit(Rule rule , String userId){
        return 0 < service.queryUserRiskAccount(userId,rule.getType());
    }

}
