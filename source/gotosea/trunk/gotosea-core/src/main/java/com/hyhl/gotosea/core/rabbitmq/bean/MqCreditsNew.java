package com.hyhl.gotosea.core.rabbitmq.bean;

import java.io.Serializable;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;

import com.hyhl.gotosea.core.cust.enm.CreditsRuleEnum;

public class MqCreditsNew implements Serializable{
	private static final long serialVersionUID = 1L;
	@NotBlank
	private String custId;
	@NotBlank
	private String custPhone;
	/**
	 * 新增积分的类型
	 */
	@NotNull
	private CreditsRuleEnum type;
	/**
	 * 消费类型，带上消费金额-分
	 */
	private Integer money;
	/**
	 * 邀请好友类型，带上成功邀请注册成功后的那个人的手机号码
	 */
	private String invitePhone;
	
	
	
	public MqCreditsNew() {
		super();
	}

	public MqCreditsNew(String custId, String custPhone, CreditsRuleEnum type) {
		super();
		this.custId = custId;
		this.custPhone = custPhone;
		this.type = type;
	}
	
	public MqCreditsNew(String custId, String custPhone, CreditsRuleEnum type, Integer money) {
		super();
		this.custId = custId;
		this.custPhone = custPhone;
		this.type = type;
		this.money = money;
	}
	
	public String getInvitePhone() {
		return invitePhone;
	}

	public void setInvitePhone(String invitePhone) {
		this.invitePhone = invitePhone;
	}

	public String getCustId() {
		return custId;
	}
	public void setCustId(String custId) {
		this.custId = custId;
	}
	public String getCustPhone() {
		return custPhone;
	}
	public void setCustPhone(String custPhone) {
		this.custPhone = custPhone;
	}
	public CreditsRuleEnum getType() {
		return type;
	}
	public void setType(CreditsRuleEnum type) {
		this.type = type;
	}
	public Integer getMoney() {
		return money;
	}
	public void setMoney(Integer money) {
		this.money = money;
	}

	@Override
	public String toString() {
		return "MqCreditsNew [custId=" + custId + ", custPhone=" + custPhone + ", type=" + type + ", money=" + money
				+ "]";
	}
}
