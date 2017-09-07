package com.hyhl.gotosea.core.cust.dto;

import javax.validation.constraints.NotNull;

public class WithdrawRequestDto {
	
	@NotNull(message="提现金额为空")
	private Integer money;
	
//	@NotBlank(message="支付密码为空")
//	private String payPassword;
	
	@NotNull(message="提现银行卡为空")
	private Integer cardId;
	
	public Integer getMoney() {
		return money;
	}
	public void setMoney(Integer money) {
		this.money = money;
	}
	public Integer getCardId() {
		return cardId;
	}
	public void setCardId(Integer cardId) {
		this.cardId = cardId;
	}
}
