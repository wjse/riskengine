package com.bamboocloud.risk.rest;

import com.bamboocloud.risk.support.ResponseJSON;
import io.swagger.annotations.*;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;

/**
 * 风险评估接口
 */
@Api(RiskAssessmentService.PATH)
@Path(RiskAssessmentService.PATH)
public interface RiskAssessmentService {

    String PATH = "/assessment";

    @GET
    @Consumes({MediaType.APPLICATION_JSON})
    @ApiOperation(value = "Get user risk code" , httpMethod = "GET")
    @ApiResponses({
        @ApiResponse(code = ResponseJSON.SUCCESS , message = "success" , response = ResponseJSON.class)
    })
    ResponseJSON getRiskCode(@ApiParam(required = true) String userId, String userIp, String city, String device);
}
