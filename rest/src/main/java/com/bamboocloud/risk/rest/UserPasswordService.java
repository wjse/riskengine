package com.bamboocloud.risk.rest;

import com.bamboocloud.risk.rest.model.UserErrorModel;
import com.bamboocloud.risk.support.ResponseJSON;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.web.bind.annotation.RequestBody;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;

/**
 * 用户密码行为接口
 */
@Api(UserPasswordService.PATH)
@Path(UserPasswordService.PATH)
public interface UserPasswordService {

    String PATH = "/postError";

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @ApiOperation(value = "Post user id when password has wrong" , httpMethod = "POST")
    @ApiResponses({
            @ApiResponse(code = ResponseJSON.SUCCESS , message = "success" , response = ResponseJSON.class)
    })
    ResponseJSON wrong(@RequestBody UserErrorModel userError);
}
