package com.hyhl.common.exception;

import java.util.Locale;

/**
 * 基础错误接口默认实现
 * @author Administrator
 *
 */
public enum BaseBusinessError implements IBaseBusinessError{

	INTER_ERROR(500, "系统内部发生错误", "inter_error"),
	
	NOT_FOUND(404, "没有找到内容", "not_found"),
	
	PARAMETER_ERROR(400, "请求参数缺失或格式不正确", "parameter_error"),
	
	UNAUTHORIZED(401, "用户未登录", "unauthorized"),
	
	FORBIDDEN(403, "权限不足", "forbidden"),
	
	;
	
	int status;
	
	String message;
	
	String code;
	
	private BaseBusinessError(int status,String message,String code){
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
