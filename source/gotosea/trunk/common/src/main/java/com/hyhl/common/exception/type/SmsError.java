package com.hyhl.common.exception.type;

import java.util.Locale;

import com.hyhl.common.exception.IBaseBusinessError;

public enum SmsError implements IBaseBusinessError {
	
	/**验证码错误 */
	CODE_ERROR(401, "验证码错误", "code_error"),
	
	/**验证码超时,请重新获取*/
	CODE_TIMEOUT(401, "验证码超时,请重新获取", "code_error"),
	
	/**%s分钟后才能获取验证码*/
	CODE_FREQUENT(403, "%s分钟后才能获取验证码", "code_error"),
	
	/**验证错误次数过多，请重新获取验证码*/
	CODE_VERIFY_MANY_ERROR(403, "验证错误次数过多，请重新获取验证码", "code_error"),
	
	/**获取验证码次数过多*/
	CODE_SEND_MANY_ERROR(403, "获取验证码次数过多", "code_error"),
	
	/**发送失败*/
	CODE_SEND_ERROR(500, "发送失败", "code_send_error")
	
	;
	
	
	int status;
	
	String message;
	
	String code;
	
	private SmsError(int status,String message,String code){
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
