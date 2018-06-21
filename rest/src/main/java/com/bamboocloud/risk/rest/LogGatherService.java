package com.bamboocloud.risk.rest;

import com.bamboocloud.risk.rest.model.UserLogInfo;
import com.bamboocloud.risk.support.ResponseJSON;
import io.swagger.annotations.*;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;

/**
 * 日志采集接口
 */
@Path(LogGatherService.PATH)
@Api(LogGatherService.PATH)
public interface LogGatherService {

    String PATH = "/log";

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @ApiOperation(value = "To gather the log information" , httpMethod = "POST")
    @ApiResponses({
        @ApiResponse(code = ResponseJSON.SUCCESS , message = "success" , response = ResponseJSON.class),
        @ApiResponse(code = ResponseJSON.SERVER_ERROR , message = "entity is null" , response = ResponseJSON.class),
        @ApiResponse(code = ResponseJSON.FORBIDDEN , message = "invalidate parameter" , response = ResponseJSON.class),
    })
    ResponseJSON log(@ApiParam(required = true) UserLogInfo logInfo);
}
