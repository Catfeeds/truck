package com.hyhl.gotosea.task.rabbit.consumer;

import com.hyhl.gotosea.core.comm.service.ActivityServiceCore;
import com.hyhl.gotosea.core.order.dto.OrderTogethers;
import com.hyhl.gotosea.core.order.po.Order;
import com.hyhl.gotosea.core.order.po.OrderServe;
import com.hyhl.gotosea.core.rabbitmq.bean.MqActService;
import com.hyhl.gotosea.core.rabbitmq.bean.MqActStatusChange;
import org.springframework.amqp.AmqpRejectAndDontRequeueException;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import com.hyhl.gotosea.core.rabbitmq.message.MqMessage;

import javax.annotation.Resource;
import java.util.Objects;

import static com.hyhl.gotosea.core.rabbitmq.enm.MqMessageEnum.*;

/**
 * Comm消费者
 * @author guan.sj
 *
 */
@Component
public class CommunityConsumer {

	@Resource
	private ActivityServiceCore activityServiceCore;

	@RabbitListener(queues = "comm.queue")
	public void processMessage(MqMessage message) {
		String routeKey = message.getRouteKey();
		try {
			if(Objects.equals(routeKey,comm_act_status_chnage.getKey())){
				activityServiceCore.actStatusChange(message.get(comm_act_status_chnage, MqActStatusChange.class));
			}
			if (Objects.equals(routeKey,comm_act_opt_service.getKey())){
				activityServiceCore.actOptService(message.get(comm_act_opt_service, MqActService.class));
			}
		} catch (Exception e) {
			throw new AmqpRejectAndDontRequeueException(routeKey+message.toString());
		}
	}

}
