package com.hyhl.gotosea.core.rabbitmq.bean;

import java.io.Serializable;
import java.util.Map;

import org.hibernate.validator.constraints.NotBlank;

public class MqSmsPush implements Serializable{
	private static final long serialVersionUID = 1L;
	@NotBlank
	private String pushSmsPhone;
	@NotBlank
	private String pushSmsTemplate;
	private Map<String,String> pushSmsParam;
	
	public MqSmsPush() {
		super();
	}
	public MqSmsPush(String pushSmsPhone, String pushSmsTemplate, Map<String,String> pushSmsParam) {
		super();
		this.pushSmsPhone = pushSmsPhone;
		this.pushSmsTemplate = pushSmsTemplate;
		this.pushSmsParam = pushSmsParam;
	}
	public String getPushSmsPhone() {
		return pushSmsPhone;
	}
	public void setPushSmsPhone(String pushSmsPhone) {
		this.pushSmsPhone = pushSmsPhone;
	}
	public String getPushSmsTemplate() {
		return pushSmsTemplate;
	}
	public void setPushSmsTemplate(String pushSmsTemplate) {
		this.pushSmsTemplate = pushSmsTemplate;
	}
	public Map<String,String> getPushSmsParam() {
		return pushSmsParam;
	}
	public void setPushSmsParam(Map<String,String> pushSmsParam) {
		this.pushSmsParam = pushSmsParam;
	}
}