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
@Table(name="t_credits_rule")
public class CreditsRule implements Serializable {
	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY)
    private Integer ruleId;

    private String ruleDescription;

    private Integer var1;

    private Integer var2;

    private Integer var3;

    private Integer var4;

    private Integer var5;

    private Date beginDate;

    private Date endDate;

    private Integer status;

    private static final long serialVersionUID = 1L;

    public Integer getRuleId() {
        return ruleId;
    }

    public void setRuleId(Integer ruleId) {
        this.ruleId = ruleId;
    }

    public String getRuleDescription() {
        return ruleDescription;
    }

    public void setRuleDescription(String ruleDescription) {
        this.ruleDescription = ruleDescription;
    }

    public Integer getVar1() {
        return var1;
    }

    public void setVar1(Integer var1) {
        this.var1 = var1;
    }

    public Integer getVar2() {
        return var2;
    }

    public void setVar2(Integer var2) {
        this.var2 = var2;
    }

    public Integer getVar3() {
        return var3;
    }

    public void setVar3(Integer var3) {
        this.var3 = var3;
    }

    public Integer getVar4() {
        return var4;
    }

    public void setVar4(Integer var4) {
        this.var4 = var4;
    }

    public Integer getVar5() {
        return var5;
    }

    public void setVar5(Integer var5) {
        this.var5 = var5;
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