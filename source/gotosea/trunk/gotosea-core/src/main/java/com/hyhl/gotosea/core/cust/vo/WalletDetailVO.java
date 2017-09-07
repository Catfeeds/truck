package com.hyhl.gotosea.core.cust.vo;

import com.hyhl.gotosea.core.common.annotation.Money;

/**
 * @author guan.sj
 */
public class WalletDetailVO{
	@Money
    private Integer totalMoney;
	@Money
    private Integer prePayMoney;
	@Money
    private Integer accumulatedIncome;
	@Money
    private Integer accumulatedRewards;
	@Money
    private Integer accumulatedWithdraw;

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

	public Integer getAccumulatedIncome() {
		return accumulatedIncome;
	}

	public void setAccumulatedIncome(Integer accumulatedIncome) {
		this.accumulatedIncome = accumulatedIncome;
	}

	public Integer getAccumulatedRewards() {
		return accumulatedRewards;
	}

	public void setAccumulatedRewards(Integer accumulatedRewards) {
		this.accumulatedRewards = accumulatedRewards;
	}

	public Integer getAccumulatedWithdraw() {
		return accumulatedWithdraw;
	}

	public void setAccumulatedWithdraw(Integer accumulatedWithdraw) {
		this.accumulatedWithdraw = accumulatedWithdraw;
	}
}