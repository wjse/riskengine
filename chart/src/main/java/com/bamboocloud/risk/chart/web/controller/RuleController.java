package com.bamboocloud.risk.chart.web.controller;

import com.bamboocloud.risk.db.entity.Rule;
import com.bamboocloud.risk.rule.RuleService;
import com.bamboocloud.risk.support.ResponseJSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rule")
public class RuleController {

    @Autowired
    private RuleService ruleService;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseJSON list(Integer pageNum){
        return new ResponseJSON(ruleService.query(pageNum,null));
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseJSON update(@RequestBody Rule rule){
        ruleService.update(rule);
        return new ResponseJSON();
    }
}
