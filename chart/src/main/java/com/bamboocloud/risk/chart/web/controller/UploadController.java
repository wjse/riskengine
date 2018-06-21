package com.bamboocloud.risk.chart.web.controller;

import com.bamboocloud.risk.chart.service.impl.StandardUploadService;
import com.bamboocloud.risk.support.ResponseJSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;

@RestController
@RequestMapping("/upload")
public class UploadController {

    private static final String IMAGE_CONTENT_TYPE = "image/jpeg";
    private static final int UPLOAD_FILE_SIZE = 204800;

    @Autowired
    private StandardUploadService uploadService;

    @Autowired
    private HttpSession session;

    @Autowired
    private HttpServletRequest request;

    @RequestMapping(value = "/image" , method = RequestMethod.POST)
    public ResponseJSON imageUpload(@RequestParam("file")MultipartFile uploadFile){
        if(null == uploadFile){
            return new ResponseJSON(ResponseJSON.NOT_FOUND,"No file uploaded");
        }

        if(!IMAGE_CONTENT_TYPE.equals(uploadFile.getContentType())){
            return new ResponseJSON(ResponseJSON.PARAMETER_WRONG , "Invalidate upload file content type");
        }

        if(uploadFile.getSize() > UPLOAD_FILE_SIZE){
            return new ResponseJSON(ResponseJSON.VALIDATE_FAIL,"Invalidate upload file size");
        }

        String tempDir = session.getServletContext().getRealPath("/images");
        long timezone = System.currentTimeMillis();
        String tempFileName = new StringBuffer(tempDir).append(File.separator).append(timezone).toString();

        String fileName = uploadService.uploadToTemp(uploadFile, tempFileName);

        String url = new StringBuffer("http://").append(request.getServerName())
                                                .append(":")
                                                .append(request.getServerPort())
                                                .append(request.getServletContext().getContextPath())
                                                .append("/images")
                                                .append(fileName)
                                                .toString();
        return new ResponseJSON(url);
    }

    @RequestMapping(params = {"url"} , method = RequestMethod.DELETE)
    public void delete(String url){
        uploadService.delete(url , session);
    }
}
