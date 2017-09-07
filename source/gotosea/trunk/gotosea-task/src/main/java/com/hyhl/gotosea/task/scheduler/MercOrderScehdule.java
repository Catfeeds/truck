package com.hyhl.gotosea.task.scheduler;

import com.hyhl.gotosea.core.order.service.MercOrderService;
import com.hyhl.gotosea.core.order.service.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
* 
* @author Leslie.Lam
* @create 2017-06-30 16:51
**/
@Component
@Configurable
@EnableScheduling
public class MercOrderScehdule {

    private final static transient Logger log = LoggerFactory.getLogger(MercOrderScehdule.class);

    @Resource
    private MercOrderService mercOrderService;

    /**
     * 自动生成商家订单
     * @throws Exception
     */
    @Scheduled(cron = "0 */5 * * * ?")
    public void generateMercOrder()throws Exception {
        log.info("==========自动生成商家订单 任务开始============");
        mercOrderService.generateMercOrder();
        log.info("==========自动生成商家订单 任务结束============");
    }
}
