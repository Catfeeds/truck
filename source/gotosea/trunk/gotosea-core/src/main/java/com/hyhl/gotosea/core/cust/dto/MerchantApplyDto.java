package com.hyhl.gotosea.core.cust.dto;

import org.hibernate.validator.constraints.NotBlank;

public class MerchantApplyDto {
	
	/**
	 * 真实姓名
	 */
	@NotBlank(message="真实姓名不能为空")
	private String realName;

	/**
	 * 证件类型
	 */
//	@NotNull(message="证件类型不能为空")
	private Integer idType;

	/**
	 * 证件号码
	 */
	@NotBlank(message="证件号码不能为空")
	private String idNum;
	
	/**
     * 证件正面
     */
	@NotBlank(message="证件正面不能为空")
    private String idPicture1;
    
    /**
     * 证件反面
     */
	@NotBlank(message="证件反面不能为空")
    private String idPicture2;


	public String getIdPicture1() {
		return idPicture1;
	}

	public void setIdPicture1(String idPicture1) {
		this.idPicture1 = idPicture1;
	}

	public String getIdPicture2() {
		return idPicture2;
	}

	public void setIdPicture2(String idPicture2) {
		this.idPicture2 = idPicture2;
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


	
}
