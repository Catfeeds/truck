package com.hyhl.common.exception.type;

import java.util.Locale;

import com.hyhl.common.exception.IBaseBusinessError;

public enum CreditsError implements IBaseBusinessError {
	
	/**无效的优惠券 */
	invalid_coupon(401, "无效的优惠券", "invalid_coupon"),
	
	/**用户当前积分不足 */
	invalid_credits(401, "用户当前积分不足", "invalid_credits"),
	
	;
	
	
	int status;
	
	String message;
	
	String code;
	
	private CreditsError(int status,String message,String code){
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
