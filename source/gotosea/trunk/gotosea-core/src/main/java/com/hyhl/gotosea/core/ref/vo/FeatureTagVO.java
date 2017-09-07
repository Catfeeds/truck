package com.hyhl.gotosea.core.ref.vo;

import java.util.List;

public class FeatureTagVO {
	
	private Integer id;//标签ID

    private Integer tagTypeId;//标签类型id

    private Integer pid;//上级标签id

    private String name;//标签名称

    private Integer level;

	private List<FeatureTagVO> tags;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

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

	public List<FeatureTagVO> getTags() {
		return tags==null?null:(tags.size()==0?null:tags);
	}

	public void setTags(List<FeatureTagVO> tags) {
		this.tags = tags;
	}

}
