package com.hyhl.gotosea.task.scheduler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.hyhl.gotosea.core.comm.dao.TActivityMapper;
import com.hyhl.gotosea.core.comm.enm.ActivityStatusEnum;
import com.hyhl.gotosea.core.comm.po.TActivity;
import com.hyhl.gotosea.core.comm.po.TActivityService;
import com.hyhl.gotosea.core.comm.service.ActivityServiceCore;
import com.hyhl.gotosea.core.util.DateUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import tk.mybatis.mapper.entity.Example;

import javax.annotation.Resource;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Component
@Configurable
@EnableScheduling
public class ActivitySchedule {

    private final static transient Logger log = LoggerFactory.getLogger(OrderScehdule.class);

    @Resource
    private ActivityServiceCore activityServiceCore;


    /**
     * 处理活动报名截止日期 (每天0点0分0秒判断是否活动报名时间截止)
     */
//    @Scheduled(cron = "0 0 0 * * ?")
//    public void activityApplyExpired(){
//        如果今天的日期大于活动集合时间且活动发起人没有点击“成行”，那么自动把截止活动报名
//    }

    @Scheduled(cron = "0 0 0 * * ?")//每天凌晨判断
    public void activityStatus() throws ParseException, JsonProcessingException {

        log.info("========== 修改已结束活动状态 任务开始 ==========");

        activityServiceCore.activityTime();//判断活动是否已经结束
        log.info("========== 修改已结束活动状态 任务结束 ==========");
    }

}
