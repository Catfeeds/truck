package com.hyhl.gotosea.core.cust.po;

import java.io.Serializable;
import java.math.BigInteger;
import java.util.Date;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author 
 */
@Table(name="t_cust_experence_change_log")
public class CustExperenceChangeLog implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private BigInteger id;

    private String custId;

    private Integer experenceBefore;

    private Integer experenceChanged;

    private Integer increase;

    private Integer decrease;

    private Date changeTime;

    private String changeReason;

    private static final long serialVersionUID = 1L;

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

    public Integer getExperenceBefore() {
        return experenceBefore;
    }

    public void setExperenceBefore(Integer experenceBefore) {
        this.experenceBefore = experenceBefore;
    }

    public Integer getExperenceChanged() {
        return experenceChanged;
    }

    public void setExperenceChanged(Integer experenceChanged) {
        this.experenceChanged = experenceChanged;
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