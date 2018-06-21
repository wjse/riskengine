package com.bamboocloud.risk.rule.observer;

import com.bamboocloud.risk.db.entity.Rule;
import com.bamboocloud.risk.rule.AbstractRuleObserver;
import com.bamboocloud.risk.rule.model.RuleType;
import com.bamboocloud.risk.rule.model.UserRuleInfo;
import com.bamboocloud.risk.rule.service.IpPortrayalRule;

public class IpPortrayalObserver extends AbstractRuleObserver {

    @Override
    protected String getType() {
        return RuleType.IP_PORTRAYAL.name();
    }

    @Override
    protected boolean isHit(Rule rule, UserRuleInfo userRuleInfo) {
        return new IpPortrayalRule().hit(rule,userRuleInfo.getId());
    }
}
