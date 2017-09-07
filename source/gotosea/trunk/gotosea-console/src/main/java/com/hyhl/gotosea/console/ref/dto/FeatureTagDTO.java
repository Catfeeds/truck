package com.hyhl.gotosea.console.ref.dto;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;

public class FeatureTagDTO {
	
	@NotNull(message="标签类型id为空")
    private Integer tagTypeId;//标签类型id

	@NotNull(message="上级标签id为空")
    private Integer pid;//上级标签id

	@NotBlank(message="标签名称为空")
    private String name;//标签名称

	@NotNull(message="标签等级为空")
    private Integer level;//标签等级

	public Integer getTagTypeId() {
		return tagTypeId;
	}

	public void setTagTypeId(Integer tagTypeId) {
		this.tagTypeId = tagTypeId;
	}

	public Integer getPid() {
		return pid;
	}

	public void setPid(Integer pid) {
		this.pid = pid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getLevel() {
		return level;
	}

	public void setLevel(Integer level) {
		this.level = level;
	}
}
