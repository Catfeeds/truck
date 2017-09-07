package com.hyhl.gotosea.core.cust.vo;

import com.hyhl.gotosea.core.common.annotation.Dict;
import com.hyhl.gotosea.core.common.annotation.Money;
import com.hyhl.gotosea.core.cust.po.WithdrawRequest;

/**
 * @author guan.sj
 */
public class WithdrawRequestPagerVO extends WithdrawRequest{
	private static final long serialVersionUID = 1L;
	@Money
	private Integer reqMoney;
	private String realName;
	private String phone;
	private String cardNo;
	private String accountName;
	private Integer cardType;
	@Dict(name="bank_card_type")
	private Integer cardTypeName;
	@Money
	private Integer totalMoney;
	@Money
	private Integer prePayMoney;
	
	public Integer getCardTypeName() {
		return cardType;
	}

	public void setCardTypeName(Integer cardTypeName) {
		this.cardTypeName = cardTypeName;
	}

	public String getCardNo() {
		return cardNo;
	}

	public void setCardNo(String cardNo) {
		this.cardNo = cardNo;
	}

	public String getAccountName() {
		return accountName;
	}

	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}

	public Integer getCardType() {
		return cardType;
	}

	public void setCardType(Integer cardType) {
		this.cardType = cardType;
	}

	public Integer getTotalMoney() {
		return totalMoney;
	}

	public void setTotalMoney(Integer totalMoney) {
		this.totalMoney = totalMoney;
	}

	public Integer getPrePayMoney() {
		return prePayMoney;
	}

	public void setPrePayMoney(Integer prePayMoney) {
		this.prePayMoney = prePayMoney;
	}

	public String getRealName() {
		return realName;
	}

	public void setRealName(String realName) {
		this.realName = realName;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}
}