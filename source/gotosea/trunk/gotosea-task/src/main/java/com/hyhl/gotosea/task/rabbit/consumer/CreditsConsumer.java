package com.hyhl.gotosea.task.rabbit.consumer;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.hyhl.gotosea.core.rabbitmq.bean.MqCreditsExchange;
import com.hyhl.gotosea.core.rabbitmq.bean.MqCreditsNew;
import com.hyhl.gotosea.core.rabbitmq.enm.MqMessageEnum;
import com.hyhl.gotosea.core.rabbitmq.message.MqMessage;
import com.hyhl.gotosea.task.rabbit.service.IMqCreditsService;

/**
 * Credits消费者
 * @author guan.sj
 *
 */
@Component
public class CreditsConsumer {
	
	@Autowired
	private IMqCreditsService iMqCreditsService;
	
	@RabbitListener(queues = "credits.queue")
	public void processMessage(MqMessage message) throws Exception {
		String routeKey = message.getRouteKey();
		//积分业务
		if (routeKey.contains(MqMessageEnum.credits_new.getKey())) {
			iMqCreditsService.creditsNew(message.getAndValid(MqMessageEnum.credits_new, MqCreditsNew.class));
		}
		if (routeKey.contains(MqMessageEnum.credits_exchange.getKey())) {
			iMqCreditsService.exchange(message.getAndValid(MqMessageEnum.credits_exchange, MqCreditsExchange.class));
		}
	}
}
