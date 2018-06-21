package com.bamboocloud.risk.db.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserRiskAccountMapper {

    int queryUserRiskAccount(@Param("userId") String userId,
                                         @Param("type") String type);

    void deleteUserRisk(String userId);
}
