package com.hyhl.gotosea.task.rabbit.consumer;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.hyhl.gotosea.core.rabbitmq.bean.MqMerchantStatistics;
import com.hyhl.gotosea.core.rabbitmq.bean.MqWithdrawApply;
import com.hyhl.gotosea.core.rabbitmq.bean.MqWithdrawFail;
import com.hyhl.gotosea.core.rabbitmq.bean.MqWithdrawSuccess;
import com.hyhl.gotosea.core.rabbitmq.enm.MqMessageEnum;
import com.hyhl.gotosea.core.rabbitmq.message.MqMessage;
import com.hyhl.gotosea.task.rabbit.service.IMqMerchantService;

/**
 * Merchant消费者
 * @author guan.sj
 *
 */
@Component
public class MerchantConsumer {
	
	@Autowired
	private IMqMerchantService iMqMerchantService;
	
	@RabbitListener(queues = "merchant.queue")
	public void processMessage(MqMessage message) throws Exception {
		String routeKey = message.getRouteKey();
		//商家提现申请
		if (routeKey.contains(MqMessageEnum.withdraw_apply.getKey())) {
			iMqMerchantService.withdrawApply(message.getAndValid(MqMessageEnum.withdraw_apply, MqWithdrawApply.class));
		} 
		//商家提现成功
		if (routeKey.contains(MqMessageEnum.withdraw_success.getKey())) {
			iMqMerchantService.withdrawSuccess(message.getAndValid(MqMessageEnum.withdraw_success, MqWithdrawSuccess.class));
		} 
		//商家提现失败
		if (routeKey.contains(MqMessageEnum.withdraw_fail.getKey())) {
			iMqMerchantService.withdrawFail(message.getAndValid(MqMessageEnum.withdraw_fail, MqWithdrawFail.class));
		} 
		//商家更新统计表
		if (routeKey.contains(MqMessageEnum.merchant_statistics.getKey())) {
			iMqMerchantService.updateMerchantStatistics(message.getAndValid(MqMessageEnum.merchant_statistics, MqMerchantStatistics.class));
		} 
	}

}
