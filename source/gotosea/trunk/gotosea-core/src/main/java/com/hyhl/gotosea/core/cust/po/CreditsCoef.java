package com.hyhl.gotosea.core.cust.po;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author guan.sj
 */
@Table(name="t_credits_coef")
public class CreditsCoef implements Serializable {
	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY)
    private Integer coefId;

    private Integer ruleId;

    private Integer custLevel;

    private Integer coef;

    private Date beginDate;

    private Date endDate;

    private Integer status;

    private static final long serialVersionUID = 1L;

    public Integer getCoefId() {
        return coefId;
    }

    public void setCoefId(Integer coefId) {
        this.coefId = coefId;
    }

    public Integer getRuleId() {
        return ruleId;
    }

    public void setRuleId(Integer ruleId) {
        this.ruleId = ruleId;
    }

    public Integer getCustLevel() {
        return custLevel;
    }

    public void setCustLevel(Integer custLevel) {
        this.custLevel = custLevel;
    }

    public Integer getCoef() {
        return coef;
    }

    public void setCoef(Integer coef) {
        this.coef = coef;
    }

    public Date getBeginDate() {
        return beginDate;
    }

    public void setBeginDate(Date beginDate) {
        this.beginDate = beginDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}