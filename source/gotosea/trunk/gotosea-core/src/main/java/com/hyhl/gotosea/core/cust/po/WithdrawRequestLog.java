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
@Table(name="t_withdraw_request_log")
public class WithdrawRequestLog implements Serializable {
	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer withdrawRequestId;

    private Integer statusBefore;

    private Integer statusAfter;

    private String userId;

    private Date processTime;

    private String remark;

    private static final long serialVersionUID = 1L;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getWithdrawRequestId() {
        return withdrawRequestId;
    }

    public void setWithdrawRequestId(Integer withdrawRequestId) {
        this.withdrawRequestId = withdrawRequestId;
    }

    public Integer getStatusBefore() {
        return statusBefore;
    }

    public void setStatusBefore(Integer statusBefore) {
        this.statusBefore = statusBefore;
    }

    public Integer getStatusAfter() {
        return statusAfter;
    }

    public void setStatusAfter(Integer statusAfter) {
        this.statusAfter = statusAfter;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Date getProcessTime() {
        return processTime;
    }

    public void setProcessTime(Date processTime) {
        this.processTime = processTime;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
}