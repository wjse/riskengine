package com.bamboocloud.risk.user;


public interface UserRiskAccountService {

    int queryUserRiskAccount(String userId, String type);

    void deleteUserRisk(String userId);
}
