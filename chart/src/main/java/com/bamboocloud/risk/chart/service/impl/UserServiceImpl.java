package com.bamboocloud.risk.chart.service.impl;

import com.bamboocloud.risk.chart.service.UserService;
import com.bamboocloud.risk.db.entity.User;
import com.bamboocloud.risk.db.mapper.UserMapper;
import com.bamboocloud.risk.support.EncryptUtil;
import com.bamboocloud.risk.support.RequestUtil;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper mapper;

    @Autowired
    private StandardUploadService uploadService;

    @Override
    public User getUser(int id , boolean withPassword) {
        return mapper.getById(id , withPassword);
    }

    @Override
    public User getUser(String username, String password) {
        if(StringUtils.isAnyEmpty(username , password)){
            throw new IllegalArgumentException("username or password is undefined");
        }

        User user = mapper.getByUsernamePassword(username , EncryptUtil.hex(password , "SHA1"));

        return user;
    }

    @Override
    public void update(User user) throws NotFoundException, IllegalAccessException {
        User queryUser = mapper.getById(user.getId() , false);
        if(null == queryUser){
            throw new NotFoundException("User not found");
        }

        if(!queryUser.getUsername().equals(user.getUsername()) && mapper.getCountByUsername(user.getUsername()) != 0){
            throw new IllegalAccessException("The user's username is existed.");
        }

        mapper.update(user);
    }

    @Override
    public PageInfo<User> query(int pageNum , Map<String, Object> map) {
        return PageHelper.startPage(pageNum,RequestUtil.PAGE_SIZE).doSelectPageInfo(() -> mapper.queryForList(map));
    }

    @Override
    public void insert(User user) throws IllegalAccessException {
        if(mapper.getCountByUsername(user.getUsername()) != 0){
            throw new IllegalAccessException("The user's username is existed.");
        }

        user.setPassword(DEFAULT_PASSWORD);
        user.setType(1);
        mapper.insert(user);
    }

    @Override
    public void delete(int id) throws IllegalAccessException {
        User user = mapper.getById(id , false);
        if(null != user && user.getType() == 0){
            throw new IllegalAccessException("Super cannot be deleted");
        }
        mapper.delete(id);
    }

    @Override
    public void delete(int id, HttpSession session) throws IllegalAccessException {
        User user = mapper.getById(id , false);
        if(null != user && user.getType() == 0){
            throw new IllegalAccessException("Super cannot be deleted");
        }

        uploadService.delete(user.getImgPath() , session);
        mapper.delete(id);
    }
}
