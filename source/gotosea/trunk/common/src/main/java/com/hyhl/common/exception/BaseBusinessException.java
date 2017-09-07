package com.hyhl.common.exception;

import java.util.Locale;

/**
 * 基础业务异常类
 * @author Gene
 *
 */
public class BaseBusinessException extends RuntimeException{

	/**
	 * 
	 */
	private static final long serialVersionUID = 7737887002287358220L;

	private String code;
	
	private IBaseBusinessError message = null;

	public BaseBusinessException(String message){
		super(message);
		this.code ="fail";
	}

	public BaseBusinessException(String code ,String message){
		super(message);
		this.code = code;
	}

	public BaseBusinessException(IBaseBusinessError error,String message){
		super(message);
		this.code = error.getCode();
	}

	public BaseBusinessException(IBaseBusinessError message){
		this(message.getCode(),message.getMessage());
		this.message = message;
	}
	
	public void setCode(String code){
		this.code = code;
	}
	
	public String getCode(){
		return this.code;
	}



	/**
	 * @param locale
	 * @return
	 */
	public String getMessage(Locale locale){
		return message.getMessage(locale);
	}
}
