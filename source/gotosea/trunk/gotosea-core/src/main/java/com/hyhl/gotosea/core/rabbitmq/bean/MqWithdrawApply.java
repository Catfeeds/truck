package com.hyhl.gotosea.core.rabbitmq.bean;

import java.io.Serializable;

public class MqWithdrawApply implements Serializable{
	private static final long serialVersionUID = 1L;
	private String custId;
	private Integer money;
	public String getCustId() {
		return custId;
	}
	public void setCustId(String custId) {
		this.custId = custId;
	}
	public Integer getMoney() {
		return money;
	}
	public void setMoney(Integer money) {
		this.money = money;
	}
}
