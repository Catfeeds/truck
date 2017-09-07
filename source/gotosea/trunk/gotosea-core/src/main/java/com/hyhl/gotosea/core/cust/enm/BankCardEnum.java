package com.hyhl.gotosea.core.cust.enm;

public enum BankCardEnum {
	
	/** card_type*/
	卡类_借记卡(1),卡类_信用卡(2),

	/** status*/
	状态_失效(0),状态_有效(1)
	
	
	;

	private int code;

	BankCardEnum(int code){
		this.code = code;
	}

	public int getCode(){
		return this.code;
	}
	
}
