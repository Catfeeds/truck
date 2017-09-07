package com.hyhl.gotosea.core.cust.enm;

public enum WalletLogEnum {

	/** 变更操作类型change_type*/
	订单收入(1), 订单收入撤销(-1), 提现申请(-2), 提现申请撤销(3), 提现(-3), 平台补贴(4), 平台补贴撤销(-4), 其他原因收入(100), 其他原因扣款(-100)

	;

	private int code;

	WalletLogEnum(int code){
		this.code = code;
	}

	public int getCode(){
		return this.code;
	}
	
}
