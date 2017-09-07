package com.hyhl.gotosea.core.order.enm;

public enum CouponEnum {
	
	/** couponTypeId 类型，默认值1-代金券*/
	类型_代金券(1),类型_满减券(2),
	
	/** applyScopeId 支付范围，默认值1-全部*/
	支付范围_全部(1),
	
	/** status优惠卷状态， 0--失效，1--生效*/
	状态_失效(0),状态_生效(1),
	
	
	;
	
	private int code;
	
	CouponEnum(int code){
		this.code = code;
	}
	
	public int getCode(){
		return this.code;
	}
}
