package com.bamboocloud.risk.rest.api;

import com.bamboocloud.risk.rest.RiskAssessmentService;
import com.bamboocloud.risk.rule.RuleService;
import com.bamboocloud.risk.rule.model.RuleResult;
import com.bamboocloud.risk.rule.model.UserRuleInfo;
import com.bamboocloud.risk.support.ResponseJSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 用户访问风向接口
 * 识别当前用户是否存在行为风险
 */
@RestController
@RequestMapping(RiskAssessmentService.PATH)
public class RiskAssessmentServiceApi implements RiskAssessmentService {

    @Autowired
    RuleService ruleService;

    @Override
    @RequestMapping(method = RequestMethod.GET, params = {"userId", "userIp", "city", "device"})
    public ResponseJSON getRiskCode(String userId, String userIp, String city, String device) {

        List<RuleResult> ruleResults = ruleService.match(new UserRuleInfo(userId, userIp, city, device));
        if (null != ruleResults && !ruleResults.isEmpty()) {
            return new ResponseJSON(500, "hit some rule", ruleResults);
        }
        return new ResponseJSON();
    }
}
