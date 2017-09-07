package com.hyhl.gotosea.core.rabbitmq.bean;

import java.io.Serializable;

import org.hibernate.validator.constraints.NotBlank;

public class MqOrderEnd implements Serializable{
	private static final long serialVersionUID = 1L;
	/**
	 * 商家的custId
	 */
	@NotBlank
	private String custId;
	
	public String getCustId() {
		return custId;
	}
	public void setCustId(String custId) {
		this.custId = custId;
	}
}
