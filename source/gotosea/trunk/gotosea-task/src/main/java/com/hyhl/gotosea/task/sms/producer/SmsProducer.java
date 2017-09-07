package com.hyhl.gotosea.task.sms.producer;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.hfocean.common.sms.core.AlidayuSmsHelper;

/**
 * @author guan.sj
 */
@Component
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class SmsProducer {
	private final static transient Logger log = LoggerFactory.getLogger(SmsProducer.class);
	
	@Autowired
	private AlidayuSmsHelper alidayuSmsHelper;
	
	public void send(String template, String phone, Map<String,String> paramMap) {
		int num = 0;
		int status = 0;
		do{
			status = sendMsg(template, phone, paramMap);
			num++;
		}while(status!=1&&num<3);
	}
	
	private int sendMsg(String template, String phone, Map<String,String> paramMap){
		int status = 0;
		try {
			status = alidayuSmsHelper.sentSMS(template, phone, paramMap);
			if(status!=1){
				String info = "推送短信失败:{template:%s,phone:%s,paramMap:%s}";
				String format = String.format(info, template, phone, paramMap.toString());
				log.info(format);
			}
		} catch (Exception e) {
			log.error(e.getMessage(),e);
		}
		return status;
	}
}
