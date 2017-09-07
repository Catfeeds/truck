package com.hyhl.gotosea.task.im.producer;

import org.igniterealtime.restclient.RestClientApi;
import org.igniterealtime.restclient.entity.MsgSendType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

/**
 * @author guan.sj
 */
@Component
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class ImProducer {
	
	private final static transient Logger log = LoggerFactory.getLogger(ImProducer.class);

	public void send(String phone,String msg, MsgSendType type,String msgTitle) {
		int num = 0;
		int status = 0;
		do{
			status = sendMsg(phone, null, msg, type, null, msgTitle);
			num++;
		}while(status!=201&&num<3);
	}

	public void send(String phone, String aboutUser,String msg, MsgSendType type, String msgId, String msgTitle) {
		int num = 0;
		int status = 0;
		do{
			status = sendMsg(phone, aboutUser, msg, type, msgId, msgTitle);
			num++;
		}while(status!=201&&num<3);
	}
	
	private int sendMsg(String phone, String aboutUser, String msg, MsgSendType type, String msgId, String msgTitle){
		int status = 0;
		try {
			status =RestClientApi.getInstance().pushMessageToUsers(phone, aboutUser, msg, type, msgId, msgTitle);
			if(status!=201){
				String info = "推送Im失败:{phone:%s,msg:%s,type:%s,msgId:%s,msgTitle:%s}";
				String format = String.format(info, phone, msg, type.name(), msgId, msgTitle);
				log.info(format);
			}
		} catch (Exception e) {
			log.error(e.getMessage(),e);
		}
		return status;
	}
}
