package com.hyhl.gotosea.core.order.enm;

public enum CustCouponEnum {
	
	/** getWay 0-其他           1-积分兑换           2-订单完成随机赠送    */
    途径_其他(0), 途径_积分兑换(1), 途径_订单完成随机赠送(2)
	
	
	;
	
	private int code;
	
	CustCouponEnum(int code){
		this.code = code;
	}
	
	public int getCode(){
		return this.code;
	}
}
