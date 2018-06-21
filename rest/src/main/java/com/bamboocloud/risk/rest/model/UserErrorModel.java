package com.bamboocloud.risk.rest.model;

/**
 * <p>文件名称: com.bamboocloud.risk.rest.model.UserErrorModel</p>
 * <p>文件描述: </p>
 * <p>版权所有: 版权所有(C)2018</p>
 * <p>公 司: 深圳竹云科技有限公司</p>
 * <p>内容摘要: // 简要描述本文件的内容，包括主要模块、函数及能的说明</p>
 * <p>其他说明: </p>
 * <p>完成日期: 2018/3/22 9:38</p>
 *
 * @author desong.tang
 */
public class UserErrorModel {

    private String userId;

    private String authType;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getAuthType() {
        return authType;
    }

    public void setAuthType(String authType) {
        this.authType = authType;
    }
}
