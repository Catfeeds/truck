package com.hyhl.gotosea.task.rabbit.consumer;

import java.util.Map;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.hfocean.common.sms.core.AlidayuSmsHelper;
import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.common.exception.type.SmsError;
import com.hyhl.gotosea.core.rabbitmq.bean.MqSmsPush;
import com.hyhl.gotosea.core.rabbitmq.enm.MqMessageEnum;
import com.hyhl.gotosea.core.rabbitmq.message.MqMessage;

/**
 * Sms消费者
 * @author guan.sj
 *
 */
@Component
public class SmsConsumer {
	
	@Autowired
	private AlidayuSmsHelper alidayuSmsHelper;
	
	@RabbitListener(queues = "sms.queue")
	public void processMessage(MqMessage message) throws Exception {
		String routeKey = message.getRouteKey();
		if(routeKey.contains(MqMessageEnum.sms_push.getKey())){
			MqSmsPush mqSmsPush = message.getAndValid(MqMessageEnum.sms_push, MqSmsPush.class);
			String template = mqSmsPush.getPushSmsTemplate();
			String phone = mqSmsPush.getPushSmsPhone();
			Map<String, String> paramMap = mqSmsPush.getPushSmsParam();
			int result = alidayuSmsHelper.sentSMS(template, phone, paramMap);
			if(result!=1)throw new BaseBusinessException(SmsError.CODE_SEND_ERROR);
		}
	}

}
