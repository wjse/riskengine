package com.bamboocloud.risk.user.service;

import com.bamboocloud.risk.db.mapper.UserRiskAccountMapper;
import com.bamboocloud.risk.user.UserRiskAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserRiskAccountServiceImpl implements UserRiskAccountService {

    @Autowired
    private UserRiskAccountMapper mapper;

    @Override
    public int queryUserRiskAccount(String userId, String type) {
        return mapper.queryUserRiskAccount(userId,type);
    }

    @Override
    public void deleteUserRisk(String userId) {
        mapper.deleteUserRisk(userId);
    }
}
