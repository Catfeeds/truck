package com.hyhl.gotosea.session;

import java.io.Serializable;

public class BaseSessionUser implements Serializable {
	private static final long serialVersionUID = 1L;
	private String id;
	private String account;//用户名
	private String name;//客户名
	private String phone;
	private Integer status;//状态0--失效，1--生效
	/**
     * 商家认证状态 1--未认证，2--已申请，3--认证成功，4--认证失败
     */
    private Integer merchantStatus;
	private boolean isFirstLoginTag=false;
	
	public Integer getMerchantStatus() {
		return merchantStatus;
	}
	public void setMerchantStatus(Integer merchantStatus) {
		this.merchantStatus = merchantStatus;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getAccount() {
		return account;
	}
	public void setAccount(String account) {
		this.account = account;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public boolean getIsFirstLoginTag() {
		return isFirstLoginTag;
	}
	public void setIsFirstLoginTag(boolean isFirstLoginTag) {
		this.isFirstLoginTag = isFirstLoginTag;
	}
}
