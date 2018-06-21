package com.bamboocloud.risk.db.mapper;

import com.bamboocloud.risk.db.entity.UserGeneralInfo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface UserGeneralInfoMapper {

    List<UserGeneralInfo> queryForList(Map<String, Object> map);
}
