package com.hyhl.gotosea.core.rabbitmq.bean;

import java.io.Serializable;

import org.hibernate.validator.constraints.NotBlank;

public class MqMerchantSuccess implements Serializable{
	private static final long serialVersionUID = 1L;
	@NotBlank
	private String custId;
	@NotBlank
	private String pushPhone;
	@NotBlank
	private String pushSmsTemplate;
	
	public MqMerchantSuccess() {
		super();
	}
	public MqMerchantSuccess(String custId, String pushPhone, String pushSmsTemplate) {
		super();
		this.custId = custId;
		this.pushPhone = pushPhone;
		this.pushSmsTemplate = pushSmsTemplate;
	}
	public String getCustId() {
		return custId;
	}
	public void setCustId(String custId) {
		this.custId = custId;
	}
	public String getPushSmsTemplate() {
		return pushSmsTemplate;
	}
	public void setPushSmsTemplate(String pushSmsTemplate) {
		this.pushSmsTemplate = pushSmsTemplate;
	}
	public String getPushPhone() {
		return pushPhone;
	}
	public void setPushPhone(String pushPhone) {
		this.pushPhone = pushPhone;
	}
	
	
}
