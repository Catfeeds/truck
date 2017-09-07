package com.hyhl.gotosea.core.cust.vo;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.hyhl.gotosea.core.common.annotation.Dict;
import com.hyhl.gotosea.core.common.annotation.Grade;
import com.hyhl.gotosea.core.common.annotation.Privacy;
import com.hyhl.gotosea.core.cust.po.Merchant;
import com.hyhl.gotosea.core.ref.serializer.FeatureTagsToStringSerializer;

/**
 * @author guan.sj
 */
public class MerchantDetailVO extends Merchant {
	private static final long serialVersionUID = 1L;
	@JsonIgnore
	private String custId;
	
	/**
     * 真实姓名
     */
	@Privacy(endIndex=0)
    private String realName;

    /**
     * 证件类型名称
     */
    @Dict(name="cust_id_type")
    private Integer idTypeName;

    /**
     * 证件号码
     */
    @Privacy(beginIndex=3)
    private String idNum;
    
    /**
     * 商家轮播图
     */
    @JsonIgnore
    private String carouselPics;
    
    //自定义字段
    /**
     * 商家轮播图数组
     */
    private List<String> carouselPicsArr;
    
    private List<Integer> tagIds;
    
    /**
     * 商家标签字段,使用,隔开，返回字符串
     */
    @JsonSerialize(using=FeatureTagsToStringSerializer.class)
    private List<Integer> tagsName;
    
    /**
     * 商家认证状态
     */
    private Integer merchantStatus;
    
    /**
     * 商家评分
     */
    @Grade
    private Integer grade;
    
    /**
     * 商家订单总数
     */
    private Integer orderCount;
    
	public Integer getGrade() {
		return grade;
	}

	public void setGrade(Integer grade) {
		this.grade = grade;
	}

	public Integer getOrderCount() {
		return orderCount;
	}

	public void setOrderCount(Integer orderCount) {
		this.orderCount = orderCount;
	}

	public Integer getIdTypeName() {
		return super.getIdType();
	}

	public void setIdTypeName(Integer idTypeName) {
		this.idTypeName = idTypeName;
	}

	public List<Integer> getTagsName() {
		return tagIds;
	}

	public void setTagsName(List<Integer> tagsName) {
		this.tagsName = tagsName;
	}

    
	public List<String> getCarouselPicsArr() {
		return carouselPicsArr;
	}

	public void setCarouselPicsArr(List<String> carouselPicsArr) {
		this.carouselPicsArr = carouselPicsArr;
	}

	public List<Integer> getTagIds() {
		return tagIds;
	}

	public void setTagIds(List<Integer> tagIds) {
		this.tagIds = tagIds;
	}

	public Integer getMerchantStatus() {
		return merchantStatus;
	}

	public void setMerchantStatus(Integer merchantStatus) {
		this.merchantStatus = merchantStatus;
	}

	public String getRealName() {
		return realName;
	}

	public void setRealName(String realName) {
		this.realName = realName;
	}

	public String getIdNum() {
		return idNum;
	}

	public void setIdNum(String idNum) {
		this.idNum = idNum;
	}
}