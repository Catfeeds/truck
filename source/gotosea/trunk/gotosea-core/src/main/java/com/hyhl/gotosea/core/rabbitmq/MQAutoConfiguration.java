package com.hyhl.gotosea.core.rabbitmq;

import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.amqp.support.converter.DefaultClassMapper;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import com.hyhl.gotosea.core.rabbitmq.message.MqMessage;

@EnableRabbit
@Configuration
@ComponentScan
public class MQAutoConfiguration {

	@Bean
	public MessageConverter messageConverter() {
		DefaultClassMapper classMapper = new DefaultClassMapper();
		classMapper.setDefaultType(MqMessage.class);
		Jackson2JsonMessageConverter messageConverter = new Jackson2JsonMessageConverter();
		messageConverter.setClassMapper(classMapper);
		return messageConverter;
	}
	
}
