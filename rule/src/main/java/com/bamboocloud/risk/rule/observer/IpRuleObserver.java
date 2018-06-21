package com.bamboocloud.risk.rule.observer;

import com.bamboocloud.risk.db.entity.Rule;
import com.bamboocloud.risk.rule.AbstractRuleObserver;
import com.bamboocloud.risk.rule.model.RuleType;
import com.bamboocloud.risk.rule.model.UserRuleInfo;
import com.bamboocloud.risk.rule.service.UserGeneralInfoRule;

public class IpRuleObserver extends AbstractRuleObserver {

    @Override
    protected String getType() {
        return RuleType.IP.name();
    }

    @Override
    protected boolean isHit(Rule rule, UserRuleInfo userRuleInfo) {
        return new UserGeneralInfoRule().hit(rule,userRuleInfo.getId(),userRuleInfo.getIp());
    }
}
