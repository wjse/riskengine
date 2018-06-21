package com.bamboocloud.risk.rest;

import com.bamboocloud.risk.rest.model.UserErrorModel;
import com.bamboocloud.risk.support.ResponseJSON;
import io.swagger.annotations.*;
import org.springframework.web.bind.annotation.RequestBody;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;

/**
 * 用户风险清除接口
 */
@Api(RiskClearService.PATH)
@Path(RiskClearService.PATH)
public interface RiskClearService {

    String PATH = "/riskClear";

    @GET
    @Consumes({MediaType.APPLICATION_JSON})
    @ApiOperation(value = "Clean User Risk" , httpMethod = "GET")
    @ApiResponses({
            @ApiResponse(code = ResponseJSON.SUCCESS , message = "success" , response = ResponseJSON.class)
    })
    ResponseJSON riskClear(@ApiParam(required = true) String userId);
}
