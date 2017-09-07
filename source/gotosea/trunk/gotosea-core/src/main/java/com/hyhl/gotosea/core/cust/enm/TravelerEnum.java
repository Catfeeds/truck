package com.hyhl.gotosea.core.cust.enm;

public enum TravelerEnum {

	/** cred_type*/
	身份证(1),港澳居民身份证(2),回乡证(3),台胞证(4),护照(5),

	/** myself*/
	同伴(0),本人(1)


	;

	private int code;

	TravelerEnum(int code){
		this.code = code;
	}

	public int code(){
		return this.code;
	}
	
	public static TravelerEnum findEnm(int code){
		TravelerEnum[] values = TravelerEnum.values();
		for(TravelerEnum value : values){
			if(value.code==code)return value;
		}
		return null;
	}
	
}
