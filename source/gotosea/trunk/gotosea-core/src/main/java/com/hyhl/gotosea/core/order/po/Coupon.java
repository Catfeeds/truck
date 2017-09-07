package com.hyhl.gotosea.core.order.po;

import java.util.Date;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonFormat;

@Table(name="t_coupon")
public class Coupon {
	
	@Id
	@NotNull
	@GeneratedValue( strategy = GenerationType.IDENTITY)
	private Integer id;

    private String name;
   
    private Integer couponTypeId;

    private Integer amount;

    private Integer consumptionMin;

    private Integer validityMonths;

    private Integer planNum;

    private Integer suppliedNum;

    private Integer status;

    private Integer creditsExchange;

    private Integer orderRandom;

    private Integer getWay;
    
    private String creater;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createTime;

	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getCouponTypeId() {
		return couponTypeId;
	}
	public void setCouponTypeId(Integer couponTypeId) {
		this.couponTypeId = couponTypeId;
	}
	
	public Integer getAmount() {
		return amount;
	}
	public void setAmount(Integer amount) {
		this.amount = amount;
	}
	
	public Integer getConsumptionMin() {
		return consumptionMin;
	}
	public void setConsumptionMin(Integer consumptionMin) {
		this.consumptionMin = consumptionMin;
	}
	public Integer getValidityMonths() {
		return validityMonths;
	}
	public void setValidityMonths(Integer validityMonths) {
		this.validityMonths = validityMonths;
	}
	public Integer getPlanNum() {
		return planNum;
	}
	public void setPlanNum(Integer planNum) {
		this.planNum = planNum;
	}
	public Integer getSuppliedNum() {
		return suppliedNum;
	}
	public void setSuppliedNum(Integer suppliedNum) {
		this.suppliedNum = suppliedNum;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public Integer getCreditsExchange() {
		return creditsExchange;
	}
	public void setCreditsExchange(Integer creditsExchange) {
		this.creditsExchange = creditsExchange;
	}
	public Integer getOrderRandom() {
		return orderRandom;
	}
	public void setOrderRandom(Integer orderRandom) {
		this.orderRandom = orderRandom;
	}
	public String getCreater() {
		return creater;
	}
	public void setCreater(String creater) {
		this.creater = creater;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public Integer getGetWay() {
		return getWay;
	}
	public void setGetWay(Integer getWay) {
		this.getWay = getWay;
	}
	
	
	
}
