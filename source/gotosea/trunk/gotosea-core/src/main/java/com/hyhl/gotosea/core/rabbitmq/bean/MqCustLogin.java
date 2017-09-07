package com.hyhl.gotosea.core.rabbitmq.bean;

import java.io.Serializable;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;

public class MqCustLogin implements Serializable{
	private static final long serialVersionUID = 1L;
	@NotBlank
	private String custId;
	@NotBlank
	private String ip;
	@NotNull
	private Long loginTime;
	
	public MqCustLogin(){
		super();
	}
	
	public MqCustLogin(String custId, String ip) {
		super();
		this.custId = custId;
		this.ip = ip;
		this.loginTime = System.currentTimeMillis();
	}
	public String getCustId() {
		return custId;
	}
	public void setCustId(String custId) {
		this.custId = custId;
	}
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	public Long getLoginTime() {
		return loginTime;
	}
	public void setLoginTime(Long loginTime) {
		this.loginTime = loginTime;
	}
}
