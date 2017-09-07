package com.hyhl.gotosea.console.cust.dto;

public class BankCardDto {
	
	/**
	 * 1--借记卡 2--信用卡
	 */
	private Integer cardType;

	private String cardNo;

	private Integer bank;

	private String accountName;

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

	public String getAccountName() {
		return accountName;
	}

	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}

}
