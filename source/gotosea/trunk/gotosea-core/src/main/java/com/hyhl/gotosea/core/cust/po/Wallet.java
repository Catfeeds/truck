package com.hyhl.gotosea.core.cust.po;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author guan.sj
 */
@Table(name="t_wallet")
public class Wallet implements Serializable {
	@Id
    private String custId;

    private String payPassword;

    private Integer totalMoney;

    private Integer prePayMoney;

    private Integer accumulatedIncome;

    private Integer accumulatedRewards;

    private Integer accumulatedWithdraw;

    private Date updateTime;

    private String remark;

    private static final long serialVersionUID = 1L;

    public String getCustId() {
        return custId;
    }

    public void setCustId(String custId) {
        this.custId = custId;
    }

    public String getPayPassword() {
        return payPassword;
    }

    public void setPayPassword(String payPassword) {
        this.payPassword = payPassword;
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

	public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
}