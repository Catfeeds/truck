package com.hyhl.gotosea.core.cust.enm;

public enum MerchantEnum {
	
	/** id_type*/
	证件类型_身份证(1)
	
	
	;
	
	private int code;
	private int[] codeArr;
	
	MerchantEnum(int code){
		this.code = code;
	}
	
	MerchantEnum(int[] codeArr){
		this.codeArr = codeArr;
	}
	
	public int getCode(){
		return this.code;
	}
	
	public int[] getCodeArr(){
		return this.codeArr;
	}
	
	public static MerchantEnum findEnm(int code){
		MerchantEnum[] values = MerchantEnum.values();
		for(MerchantEnum value : values){
			if(value.code==code)return value;
		}
		return null;
	}
}
