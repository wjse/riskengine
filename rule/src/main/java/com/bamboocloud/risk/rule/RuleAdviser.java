package com.bamboocloud.risk.rule;

import com.bamboocloud.risk.db.entity.Rule;
import com.bamboocloud.risk.rule.model.RuleResult;
import com.bamboocloud.risk.rule.model.UserRuleInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternResolver;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Observable;
import java.util.Observer;
import java.util.stream.Stream;

/**
 * 规则观察者
 * 加载指定包路径：com.bamboocloud.risk.rule.observer下所有被观察者,
 * 实例化时须传入用户规则比对信息以及当前已启用规则信息
 */
public class RuleAdviser extends Observable {

    private static final String OBSERVER_PATH = "com.bamboocloud.risk.rule.observer";
    private static Logger logger = LoggerFactory.getLogger(RuleAdviser.class);

    private ResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
    private UserRuleInfo userRuleInfo;
    private List<Rule> ruleList;

    private List<RuleResult> result = new ArrayList<>();

    public RuleAdviser(UserRuleInfo userRuleInfo , List<Rule> ruleList){
        super();
        this.userRuleInfo = userRuleInfo;
        this.ruleList = ruleList;
        loadObserver();
    }

    public UserRuleInfo getUserRuleInfo() {
        return userRuleInfo;
    }

    public List<Rule> getRuleList() {
        return ruleList;
    }

    public List<RuleResult> getResult() {
        return result;
    }

    private void loadObserver(){
        String path = String.format("%s/**.class",OBSERVER_PATH.replaceAll("[.]" , "/"));
        try {
            Resource[] resources = resolver.getResources(path);
            if(null == resources || resources.length == 0){
                return;
            }

            Stream.of(resources).forEach(resource ->{
                try {
                    String fileName = resource.getFilename();
                    String className = fileName.replace(".class","");
                    Class<Observer> clazz = (Class<Observer>) Class.forName(String.format("%s.%s",OBSERVER_PATH,className));
                    Observer observer = clazz.newInstance();
                    addObserver(observer);
                    setChanged();
                } catch (ClassNotFoundException e) {
                    logger.error(e.getMessage() , e);
                } catch (IllegalAccessException e) {
                    logger.error(e.getMessage() , e);
                } catch (InstantiationException e) {
                    logger.error(e.getMessage() , e);
                }
            });
        } catch (IOException e) {
            logger.error(e.getMessage() , e);
        }
    }
}
