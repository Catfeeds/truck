package com.hyhl.gotosea.core.ref.enm;

public enum TagTypeEnum {
	
	/** id*/
	玩家兴趣标签id(1),商家资源标签id(2),商家评价标签(3),服务标签(4)
	
	
	
	;
	
	private int code;
	
	TagTypeEnum(int code){
		this.code = code;
	}
	
	public int getCode(){
		return this.code;
	}
	
	public static TagTypeEnum findEnum(int code) {
		TagTypeEnum[] values = TagTypeEnum.values();
		for(TagTypeEnum value : values){
			if(value.code==code)return value;
		}
		return null;
	}
}
