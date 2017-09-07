package com.hyhl.gotosea.core.rabbitmq.bean;

import java.io.Serializable;

import org.hibernate.validator.constraints.NotBlank;

public class MqCustRegister implements Serializable{
	private static final long serialVersionUID = 1L;
	@NotBlank
	private String custId;
	
	private String invite;
	
	public MqCustRegister() {
		super();
	}

	public MqCustRegister(String custId) {
		super();
		this.custId = custId;
	}
	
	public MqCustRegister(String custId, String invite) {
		super();
		this.custId = custId;
		this.invite = invite;
	}

	public String getInvite() {
		return invite;
	}

	public void setInvite(String invite) {
		this.invite = invite;
	}

	public String getCustId() {
		return custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}
}
