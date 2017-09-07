package com.hyhl.gotosea.core.rabbitmq.bean;

import java.io.Serializable;

import org.hibernate.validator.constraints.NotBlank;

import com.hyhl.gotosea.core.cust.enm.MerchantStatisticsEnum;

public class MqMerchantStatistics implements Serializable{
	private static final long serialVersionUID = 1L;
	/**
	 * 商家的custId
	 */
	@NotBlank
	private String custId;
	
	private MerchantStatisticsEnum type;
	
	/**
	 * type是更新商家好评率的，带上好评数
	 */
	private Integer grade;
	
	public MqMerchantStatistics() {
		super();
	}
	
	public MqMerchantStatistics(String custId, MerchantStatisticsEnum type) {
		super();
		this.custId = custId;
		this.type = type;
	}

	public MqMerchantStatistics(String custId, MerchantStatisticsEnum type, Integer grade) {
		super();
		this.custId = custId;
		this.type = type;
		this.grade = grade;
	}
	public String getCustId() {
		return custId;
	}
	public void setCustId(String custId) {
		this.custId = custId;
	}
	public MerchantStatisticsEnum getType() {
		return type;
	}
	public void setType(MerchantStatisticsEnum type) {
		this.type = type;
	}
	public Integer getGrade() {
		return grade;
	}
	public void setGrade(Integer grade) {
		this.grade = grade;
	}
}
