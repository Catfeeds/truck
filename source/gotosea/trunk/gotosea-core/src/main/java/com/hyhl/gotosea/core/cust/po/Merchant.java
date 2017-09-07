package com.hyhl.gotosea.core.cust.po;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author guan.sj
 */
@Table(name="t_merchant")
public class Merchant implements Serializable {
    /**
     * 客户ID
     */
	@Id
    private String custId;

    /**
     * 真实姓名
     */
    @Column(name = "real_name")
    private String realName;

    /**
     * 证件类型
     */
    @Column(name = "id_type")
    private Integer idType;

    /**
     * 证件号码
     */
    @Column(name = "id_num")
    private String idNum;
    
    /**
     * 证件正面
     */
    @Column(name = "id_picture1")
    private String idPicture1;
    
    /**
     * 证件反面
     */
    @Column(name = "id_picture2")
    private String idPicture2;
    
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
    @Column(name = "area_id")
    private Integer areaId;
    
    /**
     * 定位点
     */
    @Column(name = "locator_id")
    private Integer locatorId;

    /**
     * 商家地址
     */
    private String address;

    /**
     * 商家介绍
     */
    private String introduction;

    /**
     * 商家封面图
     */
    private String picture;

    /**
     * 商家缩略图
     */
    private String thumbnail;
    
    /**
     * 商家轮播图
     */
    @Column(name = "carousel_pics")
    private String carouselPics;
    
    private static final long serialVersionUID = 1L;
    
	public Integer getLocatorId() {
        return locatorId;
    }

    public void setLocatorId(Integer locatorId) {
        this.locatorId = locatorId;
    }

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

	public String getCarouselPics() {
		return carouselPics;
	}

	public void setCarouselPics(String carouselPics) {
		this.carouselPics = carouselPics;
	}

	
}