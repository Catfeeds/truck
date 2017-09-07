package com.hyhl.gotosea.console.system.exception;

import com.hyhl.common.exception.BaseBusinessException;

/**
 * 业务异常
 * 
 */
public class BusinessException extends BaseBusinessException {
	
	private static final long serialVersionUID = 1L;
	
	private final static String DEFAULT_CODE = "599";
	
	private final static String DEFAULT_MSG = "业务异常";

	public BusinessException() {
		super(DEFAULT_CODE, DEFAULT_MSG);
	}

	public BusinessException(String msg) {
		super(DEFAULT_CODE, msg);
	}
	
	public BusinessException(String code, String msg) {
		super(code, msg);
	}

}
