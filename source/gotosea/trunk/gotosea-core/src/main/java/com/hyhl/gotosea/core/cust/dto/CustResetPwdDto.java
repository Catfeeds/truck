package com.hyhl.gotosea.core.cust.dto;

import org.hibernate.validator.constraints.NotBlank;

import com.hyhl.common.validator.custom.Password;

public class CustResetPwdDto {
	@NotBlank(message="验证码不能为空")
	private String code;
	
	@Password
	private String password;
	
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
}
