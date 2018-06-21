package com.bamboocloud.risk.db.mapper;

import com.bamboocloud.risk.db.entity.UserPasswordWrong;
import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface UserPasswordWrongMapper {

    int getCountByUserId(Map<String, String> map);

    void save(UserPasswordWrong po);

    void deleteAll();

}
