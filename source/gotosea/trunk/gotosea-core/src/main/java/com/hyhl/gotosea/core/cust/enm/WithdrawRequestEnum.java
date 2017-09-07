package com.hyhl.gotosea.core.cust.enm;

import java.util.Arrays;
import java.util.List;

public enum WithdrawRequestEnum {

	/** 提现申请单状态 status*/
	状态_已提交待审核(1),状态_已审核待处理(2),状态_成功已关闭(3),状态_失败已关闭(4),
	
	/** 后台管理系统可查询的提现申请状态*/
	可查询_提现申请状态(Arrays.asList(1,2))
	
	;

	private int code;
	private List<Integer> codeArr;

	WithdrawRequestEnum(int code){
		this.code = code;
	}
	
	WithdrawRequestEnum(List<Integer> codeArr){
		this.codeArr = codeArr;
	}

	public int getCode(){
		return this.code;
	}
	
	public List<Integer> getCodeArr(){
		return this.codeArr;
	}
	
}
