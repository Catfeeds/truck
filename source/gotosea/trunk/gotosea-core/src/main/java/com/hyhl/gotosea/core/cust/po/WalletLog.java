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
@Table(name="t_wallet_log")
public class WalletLog implements Serializable {
	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY)
    private Integer id;

    private String custId;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date changeTime;

    private Integer changeMoney;

    /**
     * 变更操作类型：
            
              1--订单收入
             -1--订单收入撤销
              2--提现申请（冻结金额）
             -2--提现申请撤销（解冻金额）
             -3--提现
              4--平台补贴
             -4--平台补贴撤销
            
             100--其他原因付款（具体原因在备注栏说明）
            -100--其他原因扣款（具体原因在备注栏说明）
            
     */
    private Integer changeType;
    
    /**
     * 对应商家订单id
     */
    private Integer merchantOrderId;
    
    private String remark;

    private static final long serialVersionUID = 1L;
    
    
    public Integer getMerchantOrderId() {
		return merchantOrderId;
	}

	public void setMerchantOrderId(Integer merchantOrderId) {
		this.merchantOrderId = merchantOrderId;
	}

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

    public Date getChangeTime() {
        return changeTime;
    }

    public void setChangeTime(Date changeTime) {
        this.changeTime = changeTime;
    }

    public Integer getChangeMoney() {
        return changeMoney;
    }

    public void setChangeMoney(Integer changeMoney) {
        this.changeMoney = changeMoney;
    }

    public Integer getChangeType() {
        return changeType;
    }

    public void setChangeType(Integer changeType) {
        this.changeType = changeType;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
}