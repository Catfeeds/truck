package com.hyhl.common.exception.type;

import java.util.Locale;

import com.hyhl.common.exception.IBaseBusinessError;

public enum CustError implements IBaseBusinessError {
	
	MERCHANT_APPLY_ERROR(403, "已申请或已通过申请，请勿重复提交", "merchant_appy_error"),
	MERCHANT_NOT_PASS(403, "请先提交商家证件等资料等待审核", "merchant_not_pass"),
	AlREADY_CHECKIN(403, "已签到", "already_checkin"),
	
	/** 钱包 */
	PAYPWD_ERROR(401, "支付密码错误", "paypwd_error"),
	
	BANKCARD_NOT_FOUND(401, "没有找到银行卡", "bankcard_not_found"),
	
	NOT_ENOUGH_MONEY(403, "余额不足", "not_enough_money"),
	
	MERCHANT_FORBIDDEN(401, "商家未认证", "merchant_forbidden");
	;

	int status;
	
	String message;
	
	String code;
	
	private CustError(int status,String message,String code){
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
