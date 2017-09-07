package com.hyhl.gotosea.core.cust.vo;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hyhl.gotosea.core.common.annotation.Dict;
import com.hyhl.gotosea.core.common.annotation.Money;
import com.hyhl.gotosea.core.cust.po.WalletLog;

/**
 * @author guan.sj
 */
public class WalletLogVO extends WalletLog{
	private static final long serialVersionUID = 1L;

	@JsonIgnore
	private String custId;
	
	@JsonFormat(pattern="yyyy-MM-dd HH:mm")
	private Date changeTime;

	@Money
	private Integer changeMoney;

	/**
	 * 变更操作类型：
	 * 
	 * 1--订单收入 -1--订单收入撤销 -2--提现申请（冻结金额） 3--提现申请撤销（解冻金额） -3--提现 4--平台补贴
	 * -4--平台补贴撤销
	 * 
	 * 100--其他原因付款（具体原因在备注栏说明） -100--其他原因扣款（具体原因在备注栏说明）
	 * 
	 */
	private Integer changeType;
	
	@Dict(name="wallet_change_type")
	private Integer changeTypeName;

	private String remark;
	
	//自定义字段
	/**changeMoney的符号
	 * 0负数，1正数
	 */
	private Integer positive;

	
	public Integer getPositive() {
		if(changeType!=null&&changeType<0){
			positive=0;
		}else{
			positive=1;
		}
		return positive;
	}

	public void setPositive(Integer positive) {
		this.positive = positive;
	}

	public Integer getChangeTypeName() {
		return changeType;
	}

	public void setChangeTypeName(Integer changeTypeName) {
		this.changeTypeName = changeTypeName;
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