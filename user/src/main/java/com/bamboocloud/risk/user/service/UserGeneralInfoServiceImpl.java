package com.bamboocloud.risk.user.service;

import com.bamboocloud.risk.db.entity.UserGeneralInfo;
import com.bamboocloud.risk.db.mapper.UserGeneralInfoMapper;
import com.bamboocloud.risk.user.UserGeneralInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserGeneralInfoServiceImpl implements UserGeneralInfoService {

    @Autowired
    private UserGeneralInfoMapper mapper;

    @Override
    public List<UserGeneralInfo> queryUserGeneralInfo(String userId, String type) {
        Map<String,Object> map = new HashMap<>();
        map.put("userId",userId);
        map.put("type",type);
        return mapper.queryForList(map);
    }

    @Override
    public List<UserGeneralInfo> queryUserGeneralInfo(String userId) {
        Map<String,Object> map = new HashMap<>();
        map.put("userId",userId);
        return mapper.queryForList(map);
    }
}
