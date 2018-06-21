package com.bamboocloud.risk.rule;

import com.bamboocloud.risk.db.entity.Rule;
import com.bamboocloud.risk.rule.model.RuleResult;
import com.bamboocloud.risk.rule.model.UserRuleInfo;
import com.github.pagehelper.PageInfo;

import java.util.List;
import java.util.Map;


public interface RuleService {

    PageInfo<Rule> query(int pageNum , Map<String,Object> map);

    List<Rule> query(Map<String,Object> map);

    List<Rule> queryNormalRuleList();

    List<RuleResult> match(UserRuleInfo userRuleInfo);

    void update(Rule rule);
}
