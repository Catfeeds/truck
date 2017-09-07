package com.hyhl.gotosea.core.cust.po;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * @author guan.sj
 */
@Table(name="t_withdraw_request")
public class WithdrawRequest implements Serializable {
	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY)
    private Integer id;

    private String custId;

    private Integer reqMoney;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date reqTime;

    private Integer cardId;

    /**
     * 1--已提交待审核
     * 2--已审核待处理
     * 3--处理成功并关闭
     * 4--处理失败并关闭
     */
    private Integer status;

    private static final long serialVersionUID = 1L;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCustId() {
        return custId;
    }

    public void setCustId(String custId) {
        this.custId = custId;
    }

    public Integer getReqMoney() {
        return reqMoney;
    }

    public void setReqMoney(Integer reqMoney) {
        this.reqMoney = reqMoney;
    }

    public Date getReqTime() {
        return reqTime;
    }

    public void setReqTime(Date reqTime) {
        this.reqTime = reqTime;
    }

    public Integer getCardId() {
        return cardId;
    }

    public void setCardId(Integer cardId) {
        this.cardId = cardId;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}