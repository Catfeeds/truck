package com.hyhl.gotosea.core.cust.dto;

import com.hyhl.common.validator.custom.Password;

public class CustUpdatePwdDto {
	@Password
	private String password;
	
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
}
