package com.hyhl.gotosea.core.cust.vo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hyhl.gotosea.core.common.annotation.Dict;
import com.hyhl.gotosea.core.common.annotation.Privacy;
import com.hyhl.gotosea.core.cust.po.BankCard;

public class BankCardVO extends BankCard {
	private static final long serialVersionUID = 1L;
	@JsonIgnore
	private String custId;
	
	@Privacy(beginIndex=0,endIndex=-5,display="")
	private String cardNo;

	/**
	 * 1--借记卡 2--信用卡
	 */
	@Dict(name="bank_card_kind")
	private Integer cardTypeName;

	@Dict(name="bank_card_type")
	private Integer bankName;

	@JsonIgnore
	private Integer status;

	public Integer getCardTypeName() {
		return super.getCardType();
	}

	public void setCardTypeName(Integer cardTypeName) {
		this.cardTypeName = cardTypeName;
	}

	public Integer getBankName() {
		return super.getBank();
	}

	public void setBankName(Integer bankName) {
		this.bankName = bankName;
	}
	
}
