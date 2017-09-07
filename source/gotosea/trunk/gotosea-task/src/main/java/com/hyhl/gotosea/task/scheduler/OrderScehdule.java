package com.hyhl.gotosea.task.scheduler;

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
public class OrderScehdule {

    private final static transient Logger log = LoggerFactory.getLogger(OrderScehdule.class);

    @Resource
    private OrderService orderService;

    /**
     * 处理超过30分钟未付款订单
     * @throws Exception
     */
    @Scheduled(cron = "0 */1 * * * ?")
    public void handleUnpayOrder()throws Exception {
        log.info("==========处理超过30分钟未付款订单 任务开始============");
        orderService.autoCloseUnpayOrder();
        log.info("==========处理超过30分钟未付款订单 任务结束============");
    }

    /**
     * 更新玩家订单为已出行状态
     * @throws Exception
     */
    @Scheduled(cron = "0 0 0 * * ?")
    public void updateOrderBegined() throws Exception{
        log.info("==========更新玩家订单为已出行状态 任务开始============");
        orderService.updateOrderBegined();
        log.info("==========更新玩家订单为已出行状态 任务结束============");
    }
}
