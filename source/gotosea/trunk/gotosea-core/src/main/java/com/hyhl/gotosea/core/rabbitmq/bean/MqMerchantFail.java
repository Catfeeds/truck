package com.hyhl.gotosea.core.rabbitmq.bean;

import java.io.Serializable;
import java.util.Map;

import org.hibernate.validator.constraints.NotBlank;

public class MqMerchantFail implements Serializable{
	private static final long serialVersionUID = 1L;
	@NotBlank
	private String custId;
	@NotBlank
	private String pushPhone;
	@NotBlank
	private String pushSmsTemplate;
	private Map<String, String> pushParam;
	
	public MqMerchantFail() {
		super();
	}
	public MqMerchantFail(String custId, String pushPhone, String pushSmsTemplate, Map<String, String> pushParam) {
		super();
		this.custId = custId;
		this.pushPhone = pushPhone;
		this.pushSmsTemplate = pushSmsTemplate;
		this.pushParam = pushParam;
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
	public Map<String, String> getPushParam() {
		return pushParam;
	}
	public void setPushParam(Map<String, String> pushParam) {
		this.pushParam = pushParam;
	}
}
