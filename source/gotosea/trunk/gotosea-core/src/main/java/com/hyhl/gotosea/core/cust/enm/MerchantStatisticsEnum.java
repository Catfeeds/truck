package com.hyhl.gotosea.core.cust.enm;

public enum MerchantStatisticsEnum {
	
	/** type*/
	更新_统计商家好评率(1),
	更新_增加商家订单数量(2),
	更新_更新商家服务数量(3),
	
	;
	
	private int code;
	
	MerchantStatisticsEnum(int code){
		this.code = code;
	}
	
	public int getCode(){
		return this.code;
	}
	
}
