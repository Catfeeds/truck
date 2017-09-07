package com.hyhl.gotosea.core.rabbitmq.bean;

import java.io.Serializable;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;

public class MqCreditsExchange implements Serializable{
	private static final long serialVersionUID = 1L;
	@NotBlank
	private String custId;
	@NotBlank
	private String phone;
	@NotNull
	private Integer before;
	@NotNull
	private Integer changed;
	@NotNull
	private Integer decrease;
	@NotBlank
	private String pushImMsg;
	
	public MqCreditsExchange() {
		super();
	}
	public MqCreditsExchange(String custId, String phone, Integer before, Integer changed, Integer decrease,
			String pushImMsg) {
		super();
		this.custId = custId;
		this.phone = phone;
		this.before = before;
		this.changed = changed;
		this.decrease = decrease;
		this.pushImMsg = pushImMsg;
	}
	public String getCustId() {
		return custId;
	}
	public void setCustId(String custId) {
		this.custId = custId;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public Integer getBefore() {
		return before;
	}
	public void setBefore(Integer before) {
		this.before = before;
	}
	public Integer getChanged() {
		return changed;
	}
	public void setChanged(Integer changed) {
		this.changed = changed;
	}
	public Integer getDecrease() {
		return decrease;
	}
	public void setDecrease(Integer decrease) {
		this.decrease = decrease;
	}
	public String getPushImMsg() {
		return pushImMsg;
	}
	public void setPushImMsg(String pushImMsg) {
		this.pushImMsg = pushImMsg;
	}
}