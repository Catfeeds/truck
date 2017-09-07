package com.hyhl.gotosea.core.cust.enm;

public enum AuditLogEnum {
	
	/** status*/
	状态_已提交待审核(0),状态_审核通过(1),状态_审核失败(2),
	
	/** audit_type*/
	类型_商家认证审核(1)
	
	
	;
	
	private int code;
	
	AuditLogEnum(int code){
		this.code = code;
	}
	
	public int getCode(){
		return this.code;
	}
	
}
