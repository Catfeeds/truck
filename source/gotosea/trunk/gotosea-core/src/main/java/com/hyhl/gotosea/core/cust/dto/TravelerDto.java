package com.hyhl.gotosea.core.cust.dto;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;

public class TravelerDto {
	
	@NotBlank(message="姓名不能为空")
    private String name;

    /**
     * 玩家证件类型
     */
	@NotNull(message="玩家证件类型不能为空")
    private Integer credType;

    /**
     * 玩家证件号码
     */
    @NotBlank(message="证件号不能为空")
    private String credNum;

    /**
     * 玩家标记（本人/同伴）
     */
    private Integer myself;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getCredType() {
		return credType;
	}

	public void setCredType(Integer credType) {
		this.credType = credType;
	}

	public String getCredNum() {
		return credNum;
	}

	public void setCredNum(String credNum) {
		this.credNum = credNum;
	}

	public Integer getMyself() {
		return myself;
	}

	public void setMyself(Integer myself) {
		this.myself = myself;
	}
	
}
