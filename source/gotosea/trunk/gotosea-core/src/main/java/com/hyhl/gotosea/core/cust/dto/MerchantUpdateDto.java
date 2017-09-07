package com.hyhl.gotosea.core.cust.dto;

import java.util.List;
import java.util.Set;

import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.NotEmpty;

import com.hyhl.common.validator.custom.Phone;

public class MerchantUpdateDto {
	
	/**
     * 商家名称
     */
	@NotBlank(message="商家名称不能为空")
    private String merchant;

    /**
     * 商家电话
     */
	@Phone
    private String phone;

	/**
     * 商家归属区域
     */
//	@NotBlank(message="商家归属区域不能为空")
    private Integer areaId;
    
    /**
     * 定位点
     */
//	@NotBlank(message="商家定位点不能为空")
    private Integer locatorId;
    
    /**
     * 商家地址
     */
	@NotBlank(message="商家地址不能为空")
    private String address;

    /**
     * 商家介绍
     */
	@NotBlank(message="商家介绍不能为空")
    private String introduction;

	 /**
     * 商家封面图
     */
//	@NotBlank(message="商家封面图不能为空")
    private String picture;

    /**
     * 商家缩略图
     */
//	@NotBlank(message="商家缩略图不能为空")
    private String thumbnail;
    
    /**
     * 商家轮播图数组
     */
	@NotEmpty(message="商家轮播图不能为空")
    private List<String> carouselPicsArray;
	
	//标签
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

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getIntroduction() {
		return introduction;
	}

	public void setIntroduction(String introduction) {
		this.introduction = introduction;
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

	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}

	public String getThumbnail() {
		return thumbnail;
	}

	public void setThumbnail(String thumbnail) {
		this.thumbnail = thumbnail;
	}

	public List<String> getCarouselPicsArray() {
		return carouselPicsArray;
	}

	public void setCarouselPicsArray(List<String> carouselPicsArray) {
		this.carouselPicsArray = carouselPicsArray;
	}
	
	

}
