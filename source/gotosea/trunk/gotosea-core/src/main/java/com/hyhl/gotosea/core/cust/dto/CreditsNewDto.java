package com.hyhl.gotosea.core.cust.dto;

public class CreditsNewDto {
	private Integer money;//平台消费金额，单位分
	private String invitedPhone;//被邀请的用户手机号
	
	public Integer getMoney() {
		return money;
	}
	public void setMoney(Integer money) {
		this.money = money;
	}
	public String getInvitedPhone() {
		return invitedPhone;
	}
	public void setInvitedPhone(String invitedPhone) {
		this.invitedPhone = invitedPhone;
	}
}
