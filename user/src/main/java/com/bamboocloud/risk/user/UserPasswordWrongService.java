package com.bamboocloud.risk.user;



import com.bamboocloud.risk.db.entity.UserPasswordWrong;

import java.util.Map;

public interface UserPasswordWrongService {

    int getCount(Map<String,String> map);

    void save(UserPasswordWrong po);

    void deleteAll();
}
