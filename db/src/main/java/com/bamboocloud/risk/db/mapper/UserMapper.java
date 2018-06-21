package com.bamboocloud.risk.db.mapper;

import com.bamboocloud.risk.db.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface UserMapper {

    User getByUsernamePassword(@Param("username") String username , @Param("password") String password);

    User getById(@Param("id") int id , @Param("withPassword") boolean withPassword);

    void update(User user);

    void insert(User user);

    void delete(int id);

    List<User> queryForList(Map<String , Object> map);

    int getCountByUsername(String username);

    void updateRole(int roleId);

    int getCountByRoleId(int id);
}
