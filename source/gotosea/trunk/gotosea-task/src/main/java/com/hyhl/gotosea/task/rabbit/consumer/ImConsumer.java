package com.hyhl.gotosea.task.rabbit.consumer;

import org.igniterealtime.restclient.RestClientApi;
import org.igniterealtime.restclient.entity.MsgSendType;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import com.hyhl.gotosea.core.rabbitmq.bean.MqImPush;
import com.hyhl.gotosea.core.rabbitmq.enm.MqMessageEnum;
import com.hyhl.gotosea.core.rabbitmq.message.MqMessage;

/**
 * im消费者
 * @author guan.sj
 *
 */
@Component
public class ImConsumer {
	
	@RabbitListener(queues = "im.queue")
	public void processMessage(MqMessage message) throws Exception {
		String routeKey = message.getRouteKey();
		if(routeKey.contains(MqMessageEnum.im_push.getKey())){
			MqImPush mqImPush = message.getAndValid(MqMessageEnum.im_push, MqImPush.class);
			String phone = mqImPush.getPhone();
			String aboutUser = mqImPush.getAboutUser();
			String msg = mqImPush.getImMsg();
			String type = mqImPush.getImType();
			String msgId = mqImPush.getImMsgId();
			String title = mqImPush.getImTitle();
			MsgSendType msgSendType = null;
			switch (Integer.parseInt(type)) {
			case 1://订单消息
				msgSendType = MsgSendType.msg_order;
				break;
			case 2://活动消息
				msgSendType = MsgSendType.msg_actvity;
				break;
			case 3://评论消息
				msgSendType = MsgSendType.msg_comment;
				break;
			case 4://系统消息
				msgSendType = MsgSendType.msg_system;
				break;
			case 5://赞消息
				msgSendType = MsgSendType.msg_praise;
				break;
			default://系统消息
				msgSendType = MsgSendType.msg_system;
				break;
			}
			RestClientApi.getInstance().pushMessageToUsers(phone, aboutUser, msg, msgSendType, msgId, title);
		}
	}

}
