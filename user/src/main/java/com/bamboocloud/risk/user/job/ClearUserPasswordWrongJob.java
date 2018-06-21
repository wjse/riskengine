package com.bamboocloud.risk.user.job;

import com.bamboocloud.risk.user.UserPasswordWrongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ClearUserPasswordWrongJob {

    @Autowired
    UserPasswordWrongService service;

    @Scheduled(cron = "0 0 1 * * ?")
    public void job(){
        service.deleteAll();
    }
}
