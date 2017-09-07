package com.hyhl.gotosea.console.system.exception;

import com.hyhl.common.exception.BaseBusinessException;

/**
 * 验证异常
 * 
 */
public class ValidateException extends BaseBusinessException {
	
	private static final long serialVersionUID = 1L;
	
	private final static String DEFAULT_CODE = "499";
	
	private final static String DEFAULT_MSG = "验证异常";
	
	public ValidateException() {
		super(DEFAULT_CODE, DEFAULT_MSG);
	}

	public ValidateException(String msg) {
		super(DEFAULT_CODE, msg);
	}
	
	

}
