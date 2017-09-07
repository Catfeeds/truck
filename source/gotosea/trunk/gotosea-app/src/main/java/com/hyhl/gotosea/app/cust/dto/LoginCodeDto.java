package com.hyhl.gotosea.app.cust.dto;

import org.hibernate.validator.constraints.NotBlank;

import com.hyhl.common.validator.custom.Phone;

public class LoginCodeDto {
	
	@Phone
	private String phone;
	
	@NotBlank(message="验证码不能为空")
	private String code;
	
	private String invite;
	
	public String getInvite() {
		return invite;
	}
	public void setInvite(String invite) {
		this.invite = invite;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	
}
