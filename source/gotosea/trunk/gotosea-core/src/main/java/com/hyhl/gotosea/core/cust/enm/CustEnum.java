package com.hyhl.gotosea.core.cust.enm;

public enum CustEnum {
	
	/** status*/
	客户状态失效(0),客户状态生效(1),
	
	/** merchant商家标记*/
	商家标记未申请商家身份(0),商家标记已申请商家身份(1),
	
	
    /** merchantStatus*/
	商家认证状态未认证(1),商家认证状态已申请(2),商家认证状态认证成功(3),商家认证状态认证失败(4),
	
	/** 自定义字段 */
	商家不能提交的认证状态(new int[]{2,3}),
	
	/** 自定义字段 只有申请状态才能审核 */
	客户不能审核商家的认证状态(new int[]{1,3,4})
	
	
	;
	
	private int code;
	private int[] codeArr;
	
	CustEnum(int code){
		this.code = code;
	}
	
	CustEnum(int[] codeArr){
		this.codeArr = codeArr;
	}
	
	public int getCode(){
		return this.code;
	}
	
	public int[] getCodeArr(){
		return this.codeArr;
	}
	
}
