package com.hyhl.gotosea.core.cust.po;

import java.io.Serializable;

import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author guan.sj
 */
@Table(name="t_merchant_statistics")
public class MerchantStatistics implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 客户ID
	 */
	@Id
	private String custId;

	/**
	 * 商家评分
	 */
	private Integer grade;
	
	/**
	 * 商家订单总数量
	 */
	private Integer orderCount;
	
	/**
	 * 商家服务总数量
	 */
	private Integer serviceCount;
	
	public Integer getServiceCount() {
		return serviceCount;
	}
	public void setServiceCount(Integer serviceCount) {
		this.serviceCount = serviceCount;
	}
	public Integer getGrade() {
		return grade;
	}
	public void setGrade(Integer grade) {
		this.grade = grade;
	}
	public String getCustId() {
		return custId;
	}
	public void setCustId(String custId) {
		this.custId = custId;
	}
	public Integer getOrderCount() {
		return orderCount;
	}
	public void setOrderCount(Integer orderCount) {
		this.orderCount = orderCount;
	}
}