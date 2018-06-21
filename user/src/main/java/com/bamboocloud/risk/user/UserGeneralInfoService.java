package com.bamboocloud.risk.user;


import com.bamboocloud.risk.db.entity.UserGeneralInfo;

import java.util.List;

public interface UserGeneralInfoService {

    List<UserGeneralInfo> queryUserGeneralInfo(String userId , String type);

    List<UserGeneralInfo> queryUserGeneralInfo(String userId);
}
