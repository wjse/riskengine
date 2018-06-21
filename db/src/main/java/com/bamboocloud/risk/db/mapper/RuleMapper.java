package com.bamboocloud.risk.db.mapper;

import com.bamboocloud.risk.db.entity.Rule;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface RuleMapper {

    List<Rule> queryForList(Map<String, Object> map);

    void update(Rule rule);

    void saveCurrentRiskCount(Map<String,Object> map);

    void updateCurrentRiskCount(Map<String,Object> map);

    Integer getCurrentRiskCount(Map<String,Object> map);

    void addRuleRiskCount(@Param("type") String type,@Param("time") String time);
}
