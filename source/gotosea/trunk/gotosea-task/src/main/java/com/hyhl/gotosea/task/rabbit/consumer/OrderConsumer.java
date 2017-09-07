package com.hyhl.gotosea.task.rabbit.consumer;

import static com.hyhl.gotosea.core.rabbitmq.enm.MqMessageEnum.order_end;
import static com.hyhl.gotosea.core.rabbitmq.enm.MqMessageEnum.order_evaluation;
import static com.hyhl.gotosea.core.rabbitmq.enm.MqMessageEnum.order_prod_info;
import static com.hyhl.gotosea.core.rabbitmq.enm.MqMessageEnum.order_prod_pub;
import static com.hyhl.gotosea.core.rabbitmq.enm.MqMessageEnum.order_return;
import static com.hyhl.gotosea.core.rabbitmq.enm.MqMessageEnum.order_start;
import static com.hyhl.gotosea.core.rabbitmq.enm.MqMessageEnum.order_togethers;
import static com.hyhl.gotosea.core.rabbitmq.enm.MqMessageEnum.order_unpay_close;

import java.util.Objects;

import javax.annotation.Resource;

import org.igniterealtime.restclient.entity.MsgSendType;
import org.springframework.amqp.AmqpRejectAndDontRequeueException;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import com.hyhl.gotosea.core.cust.enm.MerchantStatisticsEnum;
import com.hyhl.gotosea.core.order.dto.OrderTogethers;
import com.hyhl.gotosea.core.order.po.Order;
import com.hyhl.gotosea.core.order.po.OrderServe;
import com.hyhl.gotosea.core.order.service.OrderService;
import com.hyhl.gotosea.core.rabbitmq.bean.MqEvaluation;
import com.hyhl.gotosea.core.rabbitmq.bean.MqImPush;
import com.hyhl.gotosea.core.rabbitmq.bean.MqMerchantStatistics;
import com.hyhl.gotosea.core.rabbitmq.bean.MqOrderEnd;
import com.hyhl.gotosea.core.rabbitmq.message.MqMessage;
import com.hyhl.gotosea.task.im.producer.ImProducer;
import com.hyhl.gotosea.task.rabbit.service.IMqMerchantService;
/**
 * Order消费者
 *
 */
@Component
public class OrderConsumer {

    @Resource
    private OrderService orderService;
    
    @Resource
    private IMqMerchantService iMqMerchantService;

    @Resource
    private ImProducer imProducer;

	@RabbitListener(queues = "order.queue")
	public void processMessage(MqMessage message) throws Exception {
        String routeKey = message.getRouteKey();
        try {
            if(Objects.equals(routeKey,order_togethers.getKey())){
                orderService.addTravelers(message.get(order_togethers, OrderTogethers.class));
            }else if(Objects.equals(routeKey,order_prod_info.getKey())){
                orderService.addOrderServe(message.get(order_prod_info, OrderServe.class));
            }else if(Objects.equals(routeKey,order_prod_pub.getKey())){
                orderService.addOrderServeReso(message.get(order_prod_pub, Integer.class));
            }else if(Objects.equals(routeKey, order_unpay_close.getKey())){
                orderService.handleUnpayOrder(message.get(order_unpay_close, Order.class));
            }else if (Objects.equals(routeKey,order_start.getKey())){
                MqImPush push = message.get(order_start, MqImPush.class);
                imProducer.send(push.getPhone(),push.getImMsg(), MsgSendType.msg_order,push.getImTitle());
            }else if (Objects.equals(routeKey,order_return.getKey())){
                MqImPush push = message.get(order_return, MqImPush.class);
                imProducer.send(push.getPhone(),push.getImMsg(), MsgSendType.msg_order,push.getImTitle());
            }else if(Objects.equals(routeKey, order_end.getKey())){
            	//订单结束-->更新统计商家订单总数量
            	MqOrderEnd orderEnd = message.getAndValid(order_end, MqOrderEnd.class);
            	MqMerchantStatistics statistics = new MqMerchantStatistics(orderEnd.getCustId(),MerchantStatisticsEnum.更新_增加商家订单数量);
            	iMqMerchantService.updateMerchantStatistics(statistics);
            }else if(Objects.equals(routeKey, order_evaluation.getKey())){
            	//玩家评价成功-->更新统计商家好评率
            	MqEvaluation evaluation = message.getAndValid(order_evaluation, MqEvaluation.class);
            	MqMerchantStatistics statistics = new MqMerchantStatistics(evaluation.getCustId(), MerchantStatisticsEnum.更新_统计商家好评率, evaluation.getGrade());
            	iMqMerchantService.updateMerchantStatistics(statistics);
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new AmqpRejectAndDontRequeueException(routeKey+message.toString());
        }
    }

}
