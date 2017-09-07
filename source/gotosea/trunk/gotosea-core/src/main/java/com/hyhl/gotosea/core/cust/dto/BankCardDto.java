package com.hyhl.gotosea.core.cust.dto;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;

public class BankCardDto {
	
	private Integer cardType;
	
	@NotBlank(message="银行卡编号为空")
    private String cardNo;
	
	@NotNull(message="银行卡归属类为空")
    private Integer bank;

	public Integer getCardType() {
		return cardType;
	}

	public void setCardType(Integer cardType) {
		this.cardType = cardType;
	}

	public String getCardNo() {
		return cardNo;
	}

	public void setCardNo(String cardNo) {
		this.cardNo = cardNo;
	}

	public Integer getBank() {
		return bank;
	}

	public void setBank(Integer bank) {
		this.bank = bank;
	}
    
}
