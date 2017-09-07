package com.hyhl.gotosea.task.rabbit.consumer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import com.hyhl.gotosea.core.rabbitmq.message.MqMessage;


/**
 * 死信消费者
 * @author guan.sj
 *
 */
@Component
public class DeadConsumer {
	
	private Logger logger = LoggerFactory.getLogger(DeadConsumer.class);
	
	@RabbitListener(queues = "dead.queue")
	public void processMessage(MqMessage message) {
		logger.error(message.toString());
	}

}
