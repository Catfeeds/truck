package com.hyhl.gotosea.core.order.enm;

public enum StatusEnum {
	
	可用(1),
	不可用(0),

	待处理(1),成功(2),失败(3);
	
	private	Integer code;

	StatusEnum(Integer code) {
		this.code = code;
	}

	public Integer getCode() {
		return code;
	}
	
	
	
	
}
