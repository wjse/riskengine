package com.bamboocloud.risk.rule.service;

import com.bamboocloud.risk.db.entity.Rule;
import com.bamboocloud.risk.db.mapper.RuleMapper;
import com.bamboocloud.risk.rule.RuleAdviser;
import com.bamboocloud.risk.rule.RuleService;
import com.bamboocloud.risk.rule.model.RuleResult;
import com.bamboocloud.risk.rule.model.RuleType;
import com.bamboocloud.risk.rule.model.UserRuleInfo;
import com.bamboocloud.risk.support.DateUtil;
import com.bamboocloud.risk.support.RequestUtil;
import com.bamboocloud.risk.support.StatusEnum;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RuleServiceImpl implements RuleService{

    @Autowired
    private RuleMapper mapper;

    @Override
    public List<Rule> query(Map<String, Object> map) {
        return mapper.queryForList(map);
    }

    @Override
    public PageInfo<Rule> query(int pageNum , Map<String , Object> map){
        return PageHelper.startPage(pageNum,RequestUtil.PAGE_SIZE).doSelectPageInfo(() -> mapper.queryForList(map));
    }

    @Override
    public List<Rule> queryNormalRuleList() {
        Map<String,Object> map = new HashMap<>();
        map.put("status", StatusEnum.NORMAL);

        return query(map);
    }

    @Override
    public List<RuleResult> match(UserRuleInfo userRuleInfo ) {
        List<Rule> ruleList = queryNormalRuleList();
        if(null == ruleList || ruleList.isEmpty()){
            return null;
        }

        //规则观察者
        RuleAdviser observer = new RuleAdviser(userRuleInfo,ruleList);

        //通知被观察者
        observer.notifyObservers();

        //获取规则命中结果
        List<RuleResult> list = observer.getResult();

        if(null != list && !list.isEmpty()){
            saveRuleResultWhenMatch(list);
        }

        return list;
    }

    private void saveRuleResultWhenMatch(List<RuleResult> list) {
        Map<String,Object> map = new HashMap<>();
        map.put("createTime" , new Date());

        list.forEach(ruleResult -> {

            if (ruleResult.getCode().equals(RuleType.IP_PORTRAYAL.name())) return;

            map.put("type" , ruleResult.getCode());
            Integer currentCount = mapper.getCurrentRiskCount(map);
            if(null == currentCount){
                currentCount = 0;
            }
            map.put("count" , currentCount += 1);
            if(currentCount == 1){
                mapper.saveCurrentRiskCount(map);
            }else{
                mapper.updateCurrentRiskCount(map);
            }
            String time = DateUtil.getCurDateStr("HH:00");
            mapper.addRuleRiskCount(ruleResult.getCode(),time);
        });
    }

    @Override
    public void update(Rule rule) {
        mapper.update(rule);
    }
}
