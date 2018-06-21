package com.bamboocloud.risk.rest.model;

import com.bamboocloud.risk.support.DateUtil;
import org.apache.commons.lang3.StringUtils;

/**
 * 用户登录采集信息
 */
public class UserLogInfo {
    //用户唯一标识
    private String userId;

    //用户名
    private String userName;

    //用户ip地址
    private String userIp;

    //当前城市
    private String city;

    //设备信息
    private String device;

    //动作，登录login；登出logout；认证auth; ...
    private String action;

    //当前动作时间
    private Long actionTime;

    //客户端ip
    private String appIp;

    //客户端系统名称
    private String appName;

    //认证链
    private String authChain;

    //跳转方式
    private String forwardType;

    //认证源
    private String authSource;

    //失败/异常原因
    private String totalResult;

    //认证信息
    private String message;

    @Override
    public String toString() {
        StringBuilder buffer = new StringBuilder();
        buffer.append(userId).append(",")
                .append(userName).append(",")
                .append(userIp).append(",")
                .append(city).append(",")
                .append(device).append(",")
                .append(action).append(",")
                .append(DateUtil.transForDate(actionTime)).append(",")
                .append(check(appIp)).append(",")
                .append(check(appName)).append(",")
                .append(check(authChain)).append(",")
                .append(check(forwardType)).append(",")
                .append(check(authSource)).append(",")
                .append(check(totalResult)).append(",")
                .append(check(message));
        return buffer.toString();
    }

    private String check(String str) {
        if (StringUtils.isBlank(str)) {
            return "null";
        }
        return str;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserIp() {
        return userIp;
    }

    public void setUserIp(String userIp) {
        this.userIp = userIp;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getDevice() {
        return device;
    }

    public void setDevice(String device) {
        this.device = device;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public Long getActionTime() {
        return actionTime;
    }

    public void setActionTime(Long actionTime) {
        this.actionTime = actionTime;
    }


    public String getAppIp() {
        return appIp;
    }

    public void setAppIp(String appIp) {
        this.appIp = appIp;
    }

    public String getAppName() {
        return appName;
    }

    public void setAppName(String appName) {
        this.appName = appName;
    }


    public String getForwardType() {
        return forwardType;
    }

    public void setForwardType(String forwardType) {
        this.forwardType = forwardType;
    }

    public String getAuthSource() {
        return authSource;
    }

    public void setAuthSource(String authSource) {
        this.authSource = authSource;
    }


    public String getTotalResult() {
        return totalResult;
    }

    public void setTotalResult(String totalResult) {
        this.totalResult = totalResult;
    }

    public String getAuthChain() {
        return authChain;
    }

    public void setAuthChain(String authChain) {
        this.authChain = authChain;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    static public double log(double value, double base) {
        return Math.log(value) / Math.log(base);
    }

    public static void main(String[] args) {
        /**
         * 随机变量Y={是风险，不是风险}
         * 是风险的个数6/10=3/5
         * 不是风险的个数4/10=1/5
         *
         * Y的熵H(Y)=-3/5log(3/5)-1/5log(1/5)
         */

        System.out.println(-0.6*log(0.6,2)-0.2*log(0.2,2));//H(Y) = 0.91

        /**
         * 设另一变量X,设备类型
         * PC设备是风险的个数5/6，不是风险个数为1/6
         * IOS设备是风险的个数0/3，不是风险个数为3/3
         * ANDROID设备是风险个数0/1，不是风险个数1/1
         */

        System.out.println(-0.83*log(0.83,2)-0.17*log(0.17,2));//(Y|X=PC) = 0.66 , P(X = PC) = 6/10
        System.out.println(-0-1*log(1,2));//(Y|X=IOS) = 0 , P(X = IOS) = 3/10
        System.out.println(-0-1*log(1,2));//(Y|X=ANDROID) = 0 , P(X = ANDROID) = 1/10

        /**
         * 结果
         */
        System.out.println(0.6 * 0.66 + 0.3 + 0.1);

    }
}
