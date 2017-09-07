package com.hyhl.gotosea.core.order.po;

import javax.persistence.*;
import java.util.Date;

/**
 * 商家订单
 */
@Table(name = "t_merchant_order")
public class MercOrder {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private Integer orderServiceId;

	private Date createTime;

	private Integer serviceFee;

	private Date updateTime;

	private String orderNo;

	private String custId;//商家id

	private Integer status;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public Integer getOrderServiceId() {
		return orderServiceId;
	}

	public void setOrderServiceId(Integer orderServiceId) {
		this.orderServiceId = orderServiceId;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Integer getServiceFee() {
		return serviceFee;
	}

	public void setServiceFee(Integer serviceFee) {
		this.serviceFee = serviceFee;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getCustId() {
		return custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}
}
