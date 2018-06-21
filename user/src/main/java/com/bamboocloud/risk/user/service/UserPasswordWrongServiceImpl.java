package com.bamboocloud.risk.user.service;

import com.bamboocloud.risk.db.entity.UserPasswordWrong;
import com.bamboocloud.risk.db.mapper.UserPasswordWrongMapper;
import com.bamboocloud.risk.user.UserPasswordWrongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UserPasswordWrongServiceImpl implements UserPasswordWrongService {

    @Autowired
    private UserPasswordWrongMapper mapper;

    @Override
    public int getCount(Map<String, String> map) {
        return mapper.getCountByUserId(map);
    }

    @Override
    public void save(UserPasswordWrong po) {
        mapper.save(po);
    }

    @Override
    public void deleteAll() {
        mapper.deleteAll();
    }
}
