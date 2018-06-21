package com.bamboocloud.risk.rest.server;

import com.bamboocloud.risk.db.mapper.RiskChartMapper;
import com.bamboocloud.risk.rest.model.UserLogInfo;
import com.bamboocloud.risk.support.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * <p>文件名称: com.bamboocloud.risk.rest.server.AccessResultCountService</p>
 * <p>文件描述: </p>
 * <p>版权所有: 版权所有(C)2018</p>
 * <p>公 司: 深圳竹云科技有限公司</p>
 * <p>内容摘要: // 简要描述本文件的内容，包括主要模块、函数及能的说明</p>
 * <p>其他说明: </p>
 * <p>完成日期: 2018/3/8 16:23</p>
 *
 * @author desong.tang
 */

@Service
public class RiskChartService {

    @Autowired
    RiskChartMapper riskChartMapper;

    public void addAccessResultCount(UserLogInfo logInfo) {
        String time = DateUtil.getCurDateStr("HH:00");

        if (logInfo.getTotalResult().equals("true")) {
            riskChartMapper.addAccessResultCount(1, time);
        }else {
            riskChartMapper.addAccessResultCount(0, time);
        }
    }

    public void addAccessCityCount(String cityName){
        int i = riskChartMapper.getACCByNameAndType(cityName,1);

        if (i == 0){
            riskChartMapper.insertAccessCityCount(cityName);
        }else {
            riskChartMapper.addAccessCityCount(cityName);
        }

    }

}
