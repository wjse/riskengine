package com.bamboocloud.risk.chart.service.impl;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;

@Service
public class StandardUploadService{

    private Logger logger = LoggerFactory.getLogger(StandardUploadService.class);


    public String uploadToTemp(MultipartFile uploadFile, String tempFileName) {
        String fileSuffix = getFileSuffix(uploadFile.getOriginalFilename());
        String newPath = generateTmpFilePath(tempFileName, fileSuffix);

        try {
            FileUtils.copyInputStreamToFile(uploadFile.getInputStream(), new File(newPath));
            return newPath.substring(newPath.lastIndexOf(File.separator));
        } catch (IOException e) {
            logger.error(e.getMessage() , e);
            return null;
        }
    }

    public void delete(String url , HttpSession session){
        if(StringUtils.isEmpty(url)){
            return;
        }
        String fileName = url.substring(url.lastIndexOf('/'));
        String tempDir = session.getServletContext().getRealPath("/images");
        File file = new File(new StringBuffer(tempDir).append(File.separator).append(fileName).toString());
        file.delete();
    }

    private String generateTmpFilePath(String tempFileName, String suffix){
        StringBuffer buffer = new StringBuffer();
        buffer.append(tempFileName).append(suffix);
        return buffer.toString();
    }

    private String getFileSuffix(String fileName){
        return fileName.substring(fileName.lastIndexOf('.'));
    }
}

