package com.hyhl.gotosea.core.rabbitmq.bean;

import java.io.Serializable;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;

public class MqEvaluation implements Serializable{
	private static final long serialVersionUID = 1L;
	/**
	 * 商家的custId
	 */
	@NotBlank
	private String custId;
	/**
	 * 评分
	 */
	@NotNull
	private Integer grade;
	public MqEvaluation(){
		super();
	}
	public MqEvaluation(String custId,Integer grade){
		this.custId=custId;
		this.grade = grade;
	}
	public String getCustId() {
		return custId;
	}
	public void setCustId(String custId) {
		this.custId = custId;
	}
	public Integer getGrade() {
		return grade;
	}
	public void setGrade(Integer grade) {
		this.grade = grade;
	}
}
