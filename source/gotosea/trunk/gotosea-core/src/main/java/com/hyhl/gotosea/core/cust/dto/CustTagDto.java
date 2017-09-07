package com.hyhl.gotosea.core.cust.dto;

import java.util.Set;

import org.hibernate.validator.constraints.NotEmpty;

public class CustTagDto {
	@NotEmpty(message="特征标签id集不能为空")
	private Set<Integer> tagIds;//特征标签id集

	public Set<Integer> getTagIds() {
		return tagIds;
	}

	public void setTagIds(Set<Integer> tagIds) {
		this.tagIds = tagIds;
	}
}
