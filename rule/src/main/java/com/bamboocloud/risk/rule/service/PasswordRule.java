package com.bamboocloud.risk.rule.service;

import com.bamboocloud.risk.db.entity.Rule;
import com.bamboocloud.risk.support.BeanHandler;
import com.bamboocloud.risk.support.DateUtil;
import com.bamboocloud.risk.user.UserPasswordWrongService;
import org.apache.commons.lang3.StringUtils;

import java.util.*;

/**
 * 用户密码规则处理
 */
public class PasswordRule {

    UserPasswordWrongService userPasswordWrongService = BeanHandler.getBean(UserPasswordWrongService.class);

    public boolean hit(Rule rule , String userId){
        Map<String,String> map = new HashMap<>();
        map.put("userId" , userId);

        String[] timeArray = getStartTimeAndEndTime(rule.getTime());
        if(null != timeArray){
            map.put("startTime" , timeArray[0]);
            map.put("endTime" , timeArray[1]);
        }

        //获取当前用户密码错误次数
        int userCount = userPasswordWrongService.getCount(map);

        return userCount >= rule.getValue();
    }

    /**
     * 获取规则设置密码错误限制时间
     * 目前支持分钟和天为单位时间
     * 已_分割，如day_1或者minute_30
     * 分别表示1天和30分钟
     * @param time
     * @return
     */
    private String[] getStartTimeAndEndTime(String time){
        if(StringUtils.isEmpty(time) || time.indexOf('_') < 0){
            return null;
        }

        String[] array = time.split("_");

        if(array.length != 2){
            return null;
        }

        String timeType = array[0];
        int timeCount = Integer.parseInt(array[1]);

        if("day".equals(timeType)){
            return getDayTypeTimes(timeCount);
        }else if("minute".equals(timeType)){
            return getMinuteTypeTimes(timeCount);
        }

        return null;
    }

    /**
     * 获取天范围内时间
     * 从00:00:00到23:59:59
     * @param timeCount
     * @return
     */
    private String[] getDayTypeTimes(int timeCount){
        Calendar calendar = new GregorianCalendar();
        String current = DateUtil.getCurDateStr("yyyy-MM");
        int date = calendar.get(Calendar.DATE);

        return new String[]{String.format("%s-%s 00:00:00" , current , date * timeCount)
                 , String.format("%s-%s 23:59:59" , current , date * timeCount)};
    }

    /**
     * 获取分钟范围内时间
     * 当前时间到设置时间之前
     * @param timeCount
     * @return
     */
    private String[] getMinuteTypeTimes(int timeCount){
        Calendar calendar = new GregorianCalendar();
        long current = System.currentTimeMillis(),
             timeCountMills = timeCount * 60 * 1000;

        calendar.setTimeInMillis(current - timeCountMills);
        Date beforeDate = calendar.getTime();

        return new String[]{DateUtil.getStringByDate(beforeDate , "yyyy-MM-dd HH:mm:ss")
                 , DateUtil.getStringByDate(new Date(current) , "yyyy-MM-dd HH:mm:ss") };
    }
}
