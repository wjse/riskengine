package com.bamboocloud.risk.rule;

import com.bamboocloud.risk.db.entity.Rule;
import com.bamboocloud.risk.rule.model.RuleResult;
import com.bamboocloud.risk.rule.model.UserRuleInfo;
import com.bamboocloud.risk.support.DateUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Observable;
import java.util.Observer;
import java.util.Optional;

/**
 * 规则被观察者抽象父类
 * 定义统一的类型行为，命中行为
 */
public abstract class AbstractRuleObserver implements Observer {

    private static final String GENERAL_RISK_INFO_KEY = "generalRiskInfo&{}";
    private Logger logger = LoggerFactory.getLogger(AbstractRuleObserver.class);

    /**
     * 匹配子类规则类型
     * @param rulePO
     * @return
     */
    protected boolean isType(Rule rulePO){
        return rulePO.getType().equals(getType());
    }

    @Override
    public void update(Observable o, Object arg) {
        //观察者
        RuleAdviser adviser = (RuleAdviser)o;
        List<Rule> ruleList = adviser.getRuleList();

        //找到符合当前被观察者的规则
        Optional<Rule> optional = ruleList.stream().filter(rule -> isType(rule)).findFirst();
        if(!optional.isPresent()){
            logger.warn("There is no rule found by " + getType());
            return;
        }

        Rule rule = optional.get();
        UserRuleInfo userRuleInfo = adviser.getUserRuleInfo();

        //匹配是否命中
        boolean isHit = isHit(rule,userRuleInfo);

        if(isHit){
            //命中将结果交由观察者保管并记录HDFS所用日志
            adviser.getResult().add(result(rule));
            saveHDFSLog(userRuleInfo , rule);
        }
    }

    protected void saveHDFSLog(UserRuleInfo userRuleInfo , Rule rule){
        StringBuilder buffer = new StringBuilder();
        buffer.append(userRuleInfo.getId()).append(",")
                .append(rule.getType()).append(",")
                .append(rule.getMessage()).append(",")
                .append(DateUtil.getCurDateStr(DateUtil.DEFAULT));
        logger.info(GENERAL_RISK_INFO_KEY,buffer);
    }

    protected RuleResult result(Rule rule){
        return new RuleResult(rule.getType() , rule.getMessage());
    }

    protected abstract String getType();

    protected abstract boolean isHit(Rule rule , UserRuleInfo userRuleInfo);


}
