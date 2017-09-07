package com.hyhl.gotosea.app.cust.dto;

import org.hibernate.validator.constraints.NotBlank;

import com.hyhl.common.validator.custom.Phone;

public class LoginPwdDto {
	
	@Phone
	private String phone;
	
	@NotBlank(message="密码不能为空")
	private String password;
	
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
}
