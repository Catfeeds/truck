package com.hyhl.common.exception.type;

import java.util.Locale;

import com.hyhl.common.exception.IBaseBusinessError;

public enum LoginError implements IBaseBusinessError {
	
	UNAUTHORIZED(401, "用户未登录", "unauthorized"),
	CUST_FORBIDDEN(401, "用户被禁用", "cust_forbidden"),
	INVALID_USERNAME(401, "不正确的用户名 ", "invalid_username"),
	INVALID_PASSWORD(401, "不正确的密码", "invalid_password"),
	
	/**用户未注册*/
	UNREGISTERED(401, "用户未注册", "unregistered"),
	NOT_EXIST(401, "用户不存在", "not_exist"),
	
	NOT_FIRST_LOGIN(401, "非首次登录", "not_first_login"),
	
	/**手机号码已被注册*/
	PHONE_ALREADY_EXIST(403, "手机号码已被注册", "phone_already_exist"),
	
	/**用户名已被注册*/
	ACCOUNT_ALREADY_EXIST(403, "用户名已被注册", "account_already_exist")
	
	;

	int status;
	
	String message;
	
	String code;
	
	private LoginError(int status,String message,String code){
		this.status = status;
		this.message = message;
		this.code = code;
	}
	
	@Override
	public int getStatus() {
		return status;
	}

	@Override
	public String getMessage() {
		return message;
	}
	
	@Override
	public String getCode() {
		return code;
	}

	@Override
	public String getMessage(Locale locale) {
		return message;
	}
	
}
