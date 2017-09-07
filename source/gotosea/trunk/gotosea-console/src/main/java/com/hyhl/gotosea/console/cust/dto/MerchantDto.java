package com.hyhl.gotosea.console.cust.dto;

public class MerchantDto {
	
	/**
	 * 客户id
	 */
	private String custId;

	/**
	 * 真实姓名
	 */
	private String realName;

	/**
	 * 证件类型
	 */
	private Integer idType;

	/**
	 * 证件号码
	 */
	private String idNum;

	/**
	 * 商家名称
	 */
	private String merchant;

	/**
	 * 商家电话
	 */
	private String phone;

	/**
	 * 商家归属区域
	 */
	private Integer areaId;

	/**
	 * 定位点
	 */
	private Integer locatorId;

	/**
	 * 商家地址
	 */
	private String address;

	public String getCustId() {
		return custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}

	public String getRealName() {
		return realName;
	}

	public void setRealName(String realName) {
		this.realName = realName;
	}

	public Integer getIdType() {
		return idType;
	}

	public void setIdType(Integer idType) {
		this.idType = idType;
	}

	public String getIdNum() {
		return idNum;
	}

	public void setIdNum(String idNum) {
		this.idNum = idNum;
	}

	public String getMerchant() {
		return merchant;
	}

	public void setMerchant(String merchant) {
		this.merchant = merchant;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Integer getAreaId() {
		return areaId;
	}

	public void setAreaId(Integer areaId) {
		this.areaId = areaId;
	}

	public Integer getLocatorId() {
		return locatorId;
	}

	public void setLocatorId(Integer locatorId) {
		this.locatorId = locatorId;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}
	
	
}
