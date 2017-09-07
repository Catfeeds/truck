package com.hyhl.gotosea.core.cust.dto;

import java.util.Set;

public class CustTagUpdateDto {
	private Set<Integer> ids;
	private Set<Integer> tagIds;
	public Set<Integer> getIds() {
		return ids;
	}
	public void setIds(Set<Integer> ids) {
		this.ids = ids;
	}
	public Set<Integer> getTagIds() {
		return tagIds;
	}
	public void setTagIds(Set<Integer> tagIds) {
		this.tagIds = tagIds;
	}
}
