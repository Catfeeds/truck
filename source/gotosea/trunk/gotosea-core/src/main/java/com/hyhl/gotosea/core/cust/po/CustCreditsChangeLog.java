package com.hyhl.gotosea.core.cust.po;

import java.io.Serializable;
import java.math.BigInteger;
import java.util.Date;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * @author guan.sj
 */
@Table(name="t_cust_credits_change_log")
public class CustCreditsChangeLog implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private BigInteger id;

    private String custId;

    private Integer balanceBefore;

    private Integer balanceChanged;

    private Integer increase;

    private Integer decrease;
    
    private Integer ruleId;
    
    @JsonFormat(pattern="yyyy-MM-dd HH:mm")
    private Date changeTime;

    private String changeReason;

    private static final long serialVersionUID = 1L;
    
    public Integer getRuleId() {
		return ruleId;
	}

	public void setRuleId(Integer ruleId) {
		this.ruleId = ruleId;
	}

	public BigInteger getId() {
        return id;
    }

    public void setId(BigInteger id) {
        this.id = id;
    }

    public String getCustId() {
        return custId;
    }

    public void setCustId(String custId) {
        this.custId = custId;
    }

    public Integer getBalanceBefore() {
        return balanceBefore;
    }

    public void setBalanceBefore(Integer balanceBefore) {
        this.balanceBefore = balanceBefore;
    }

    public Integer getBalanceChanged() {
        return balanceChanged;
    }

    public void setBalanceChanged(Integer balanceChanged) {
        this.balanceChanged = balanceChanged;
    }

    public Integer getIncrease() {
        return increase;
    }

    public void setIncrease(Integer increase) {
        this.increase = increase;
    }

    public Integer getDecrease() {
        return decrease;
    }

    public void setDecrease(Integer decrease) {
        this.decrease = decrease;
    }

    public Date getChangeTime() {
        return changeTime;
    }

    public void setChangeTime(Date changeTime) {
        this.changeTime = changeTime;
    }

    public String getChangeReason() {
        return changeReason;
    }

    public void setChangeReason(String changeReason) {
        this.changeReason = changeReason;
    }
}