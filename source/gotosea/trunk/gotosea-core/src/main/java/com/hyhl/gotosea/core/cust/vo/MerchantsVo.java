package com.hyhl.gotosea.core.cust.vo;

import java.math.BigDecimal;

/**
* 
* @author Leslie.Lam
* @create 2017-08-04 17:46
**/
public class MerchantsVo {

    private String custId;

    /**
     * 商家名称
     */
    private String merchant;

    /**
     * 商家地址
     */
    private String address;

    /**
     * 商家照片
     */
    private String thumbnail;

    /**
     * 商家评分
     */
    private Integer grade;
    
    /**
     * 商家服务数量统计
     */
    private Integer serviceCount;

    
    public Integer getServiceCount() {
		return serviceCount;
	}

	public void setServiceCount(Integer serviceCount) {
		this.serviceCount = serviceCount;
	}

	public String getCustId() {
        return custId;
    }

    public void setCustId(String custId) {
        this.custId = custId;
    }

    public String getMerchant() {
        return merchant;
    }

    public void setMerchant(String merchant) {
        this.merchant = merchant;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public String getGrade() {
        return null==grade?"暂无":new BigDecimal(grade).multiply(new BigDecimal(0.1)).setScale(1, BigDecimal.ROUND_HALF_UP).toString();
    }

    public void setGrade(Integer grade) {
        this.grade = grade;
    }
}
