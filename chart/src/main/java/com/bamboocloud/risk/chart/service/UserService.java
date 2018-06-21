package com.bamboocloud.risk.chart.service;


import com.bamboocloud.risk.db.entity.User;
import com.bamboocloud.risk.support.EncryptUtil;
import com.github.pagehelper.PageInfo;
import org.apache.ibatis.javassist.NotFoundException;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

public interface UserService {

    String DEFAULT_PASSWORD = EncryptUtil.hex(EncryptUtil.hex("123456" , "SHA1"),"SHA1");

    User getUser(int id , boolean withPassword);

    User getUser(String username , String password);

    void update(User user) throws NotFoundException, IllegalAccessException;

    PageInfo<User> query(int pageNum , Map<String,Object> map);

    void insert(User user) throws IllegalAccessException;

    void delete(int id) throws IllegalAccessException;

    void delete(int id , HttpSession session) throws IllegalAccessException;
}
