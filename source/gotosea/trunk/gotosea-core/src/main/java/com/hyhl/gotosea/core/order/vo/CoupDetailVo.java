package com.hyhl.gotosea.core.order.vo;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class CoupDetailVo {
	
	
	private Integer custCoupId;
	private Integer couponId;//优惠卷ID
	private String 	couponType;//优惠卷使用范围
	private Integer typeId;
	private String name;
	private Integer amount;//优惠卷金额
	private Integer surplusNum;//剩余数量
	private Integer consumptionMin;//满减金额下限；
	private Integer credits;//可由积分兑换优惠的积分数
	@JsonFormat(pattern = "yyyy.MM.dd")
	private Date beginDate;
	
	@JsonFormat(pattern = "yyyy.MM.dd")
	private Date endDate;
	
	public Integer getCustCoupId() {
		return custCoupId;
	}
	public void setCustCoupId(Integer custCoupId) {
		this.custCoupId = custCoupId;
	}
	public Integer getCouponId() {
		return couponId;
	}
	public void setCouponId(Integer couponId) {
		this.couponId = couponId;
	}
	public Integer getAmount() {
		return (amount/Integer.parseInt("100"));
	}
	public void setAmount(Integer amount) {
		this.amount = amount;
	}
	public Integer getConsumptionMin() {
		return (consumptionMin/100);
	}
	public void setConsumptionMin(Integer consumptionMin) {
		this.consumptionMin = consumptionMin;
	}
	public Integer getCredits() {
		return credits;
	}
	public void setCredits(Integer credits) {
		this.credits = credits;
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
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getTypeId() {
		return typeId;
	}
	public void setTypeId(Integer typeId) {
		this.typeId = typeId;
	}
	public String getCouponType() {
		return couponType;
	}
	public void setCouponType(String couponType) {
		this.couponType = couponType;
	}
	
	
	public Integer getSurplusNum() {
		return surplusNum;
	}
	public void setSurplusNum(Integer surplusNum) {
		this.surplusNum = surplusNum;
	}
	@Override
	public String toString() {
		return "CoupDetailVo [couponId=" + couponId + ", couponType=" + couponType + ", typeId=" + typeId + ", name="
				+ name + ", amount=" + amount + ", consumptionMin=" + consumptionMin + ", credits=" + credits
				+ ", beginDate=" + beginDate + ", endDate=" + endDate + "]";
	}
	
	
	
}
