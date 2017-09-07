package com.hyhl.gotosea.core.cust.dto;

import java.util.Set;

public class CustUpdateDto {

    /**
     * 客户名称
     */
//	@NotBlank(message="客户名称不能为空")
    private String name;

    /**
     * 邮箱
     */
    private String email;

    /**
     * 性别
     */
//    @NotNull(message="性别不能为空")
    private Integer sex;

    /**
     * 头像
     */
//    @NotBlank(message="头像不能为空")
    private String picture;
    
    /**
     * 地区
     */
//    @NotNull(message="地区不能为空")
    private Integer areaId;
    
    /**
     * 玩家兴趣标签
     */
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

	public Integer getAreaId() {
		return areaId;
	}

	public void setAreaId(Integer areaId) {
		this.areaId = areaId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Integer getSex() {
		return sex;
	}

	public void setSex(Integer sex) {
		this.sex = sex;
	}

	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}

}
