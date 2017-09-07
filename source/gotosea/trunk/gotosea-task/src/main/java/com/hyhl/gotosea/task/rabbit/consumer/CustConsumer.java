package com.hyhl.gotosea.task.rabbit.consumer;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.hyhl.gotosea.core.rabbitmq.bean.MqCustLogin;
import com.hyhl.gotosea.core.rabbitmq.bean.MqCustRegister;
import com.hyhl.gotosea.core.rabbitmq.bean.MqMerchantFail;
import com.hyhl.gotosea.core.rabbitmq.bean.MqMerchantSuccess;
import com.hyhl.gotosea.core.rabbitmq.enm.MqMessageEnum;
import com.hyhl.gotosea.core.rabbitmq.message.MqMessage;
import com.hyhl.gotosea.task.rabbit.service.IMqCustService;

/**
 * Cust消费者
 * @author guan.sj
 *
 */
@Component
public class CustConsumer {
	
	@Autowired
	private IMqCustService iMqCustService;
	
	@RabbitListener(queues = "cust.queue")
	public void processMessage(MqMessage message) throws Exception {
		String routeKey = message.getRouteKey();
		//用户登录
		if (routeKey.contains(MqMessageEnum.cust_login.getKey())) {
			iMqCustService.login(message.getAndValid(MqMessageEnum.cust_login, MqCustLogin.class));
		}
		//用户注册
		if (routeKey.contains(MqMessageEnum.cust_register.getKey())) {
			iMqCustService.register(message.getAndValid(MqMessageEnum.cust_register, MqCustRegister.class));
		}
		//商家认证成功
		if (routeKey.contains(MqMessageEnum.be_merchant_success.getKey())) {
			iMqCustService.merchantSuccess(message.getAndValid(MqMessageEnum.be_merchant_success, MqMerchantSuccess.class));
		}
		//商家认证失败
		if (routeKey.contains(MqMessageEnum.be_merchant_fail.getKey())) {
			iMqCustService.merchantFail(message.getAndValid(MqMessageEnum.be_merchant_fail, MqMerchantFail.class));
		}
	}
	
}
