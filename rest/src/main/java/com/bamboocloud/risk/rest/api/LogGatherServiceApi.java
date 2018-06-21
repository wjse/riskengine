package com.bamboocloud.risk.rest.api;

import com.bamboocloud.risk.rest.LogGatherService;
import com.bamboocloud.risk.rest.model.UserLogInfo;
import com.bamboocloud.risk.rest.server.RiskChartService;
import com.bamboocloud.risk.support.ResponseJSON;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import static com.bamboocloud.risk.support.ResponseJSON.PARAMETER_WRONG;
import static com.bamboocloud.risk.support.ResponseJSON.SERVER_ERROR;


/**
 * 用户访问日志记录接口
 * 用于非实时计算
 */
@RestController
@RequestMapping(LogGatherService.PATH)
public class LogGatherServiceApi implements LogGatherService {

    private static final String USER_GENERAL_LOG_KEY = "generalInfo&{}";
    private static final Logger LOG = LoggerFactory.getLogger(LogGatherServiceApi.class);

    @Autowired
    RiskChartService riskChartService;

    @Override
    @RequestMapping(method = RequestMethod.POST)
    public ResponseJSON log(@RequestBody UserLogInfo logInfo) {

        ResponseJSON resp;
        if(!(resp = validate(logInfo)).isOk()){
            return resp;
        }

        LOG.info(USER_GENERAL_LOG_KEY , logInfo.toString());

        riskChartService.addAccessResultCount(logInfo);
        riskChartService.addAccessCityCount(logInfo.getCity());
        return resp;
    }

    private ResponseJSON validate(UserLogInfo logInfo){
        if(null == logInfo){
            return new ResponseJSON(SERVER_ERROR , "entity is null");
        }

        if(!isRequired(logInfo)){
            return new ResponseJSON(PARAMETER_WRONG , "invalidate parameter");
        }

        return new ResponseJSON();
    }

    private boolean isRequired(UserLogInfo logInfo){
        return StringUtils.isNoneEmpty(logInfo.getUserId(),logInfo.getUserName() , logInfo.getUserIp() ,
                                       logInfo.getCity(), logInfo.getDevice(), logInfo.getAppName(), logInfo.getAction())
                && null != logInfo.getActionTime();
    }
}
