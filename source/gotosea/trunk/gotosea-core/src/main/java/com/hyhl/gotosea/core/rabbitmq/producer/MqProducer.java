package com.hyhl.gotosea.core.rabbitmq.producer;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.hyhl.gotosea.core.rabbitmq.enm.ExchangeEnum;
import com.hyhl.gotosea.core.rabbitmq.message.MqMessage;

/**
* 
* @author Leslie.Lam
* @create 2017-08-08 11:19
**/
@Component
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class MqProducer {

	@Autowired
	private AmqpTemplate amqpTemplate;
	
	public void send(MqMessage message) {
		amqpTemplate.convertAndSend(message.getExchange(), message.getRouteKey(), message);
	}
	
	public void send(ExchangeEnum exchange, MqMessage message) {
		amqpTemplate.convertAndSend(exchange.getKey(), message.getRouteKey(), message);
	}
	
}
