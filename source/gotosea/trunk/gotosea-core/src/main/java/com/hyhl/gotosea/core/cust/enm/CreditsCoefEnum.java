package com.hyhl.gotosea.core.cust.enm;

public enum CreditsCoefEnum {
	/** status 0无效 1 有效*/
	状态_失效(0),状态_生效(1)
	
	;
	
	public int code;
	
	CreditsCoefEnum(int code){
		this.code = code;
	}
	
	public int getCode(){
		return this.code;
	}
	
}

