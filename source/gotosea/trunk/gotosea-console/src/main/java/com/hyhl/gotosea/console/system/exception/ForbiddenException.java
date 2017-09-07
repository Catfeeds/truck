package com.hyhl.gotosea.console.system.exception;

import com.hyhl.common.exception.BaseBusinessException;

/**
 * 权限异常
 * 
 */
public class ForbiddenException extends BaseBusinessException {

	private static final long serialVersionUID = 1L;
	private final static String DEFAULT_CODE = "403";
	
	private final static String DEFAULT_MSG = "权限不足";

	public ForbiddenException() {
		super(DEFAULT_CODE, DEFAULT_MSG);
	}

	public ForbiddenException(String msg) {
		super(DEFAULT_CODE, msg);
	}
	
	public ForbiddenException(String code, String msg) {
		super(code, msg);
	}
	
}
