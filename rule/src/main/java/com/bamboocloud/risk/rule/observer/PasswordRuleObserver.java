package com.bamboocloud.risk.rule.observer;

import com.bamboocloud.risk.db.entity.Rule;
import com.bamboocloud.risk.rule.AbstractRuleObserver;
import com.bamboocloud.risk.rule.model.RuleType;
import com.bamboocloud.risk.rule.model.UserRuleInfo;
import com.bamboocloud.risk.rule.service.PasswordRule;

public class PasswordRuleObserver extends AbstractRuleObserver {

    @Override
    protected String getType() {
        return RuleType.PASSWORD.name();
    }

    @Override
    protected boolean isHit(Rule rule, UserRuleInfo userRuleInfo) {
        return new PasswordRule().hit(rule,userRuleInfo.getId());
    }
}
