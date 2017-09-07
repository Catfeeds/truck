package com.hyhl.gotosea.core.ref.enm;

public enum FeatureTagEnum {
	
	/** level*/
	玩家可选标签级别(2),商家可选标签级别(1),
	
	
	
	;
	
	private int code;
	
	FeatureTagEnum(int code){
		this.code = code;
	}
	
	public int getCode(){
		return this.code;
	}
	
}
