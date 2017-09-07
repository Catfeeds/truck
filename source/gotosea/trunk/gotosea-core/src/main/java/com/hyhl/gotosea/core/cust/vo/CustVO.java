package com.hyhl.gotosea.core.cust.vo;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * @author guan.sj
 */
public class CustVO{

    /**
     * 客户帐号
     */
    private String account;

    /**
     * 客户名称
     */
    private String name;

    /**
     * 手机号码
     */
    private String phone;

    /**
     * 邮箱
     */
    private String email;

    /**
     * 性别
     */
    private Integer sex;

    /**
     * 头像
     */
    private String picture;

    /**
     * 客户级别
     */
    private Integer level;

    /**
     * 注册时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date createTime;

    /**
     * 客户状态
     */
    private Integer status;

    /**
     * 商家标记
     */
    private Integer merchant;
    
    /**
     * 商家认证状态
     */
    private Integer merchantStatus;
    
    
    /**
     * 玩家积分
     */
    private Integer credits;
    
    private boolean isFirst=false;

    
    public boolean getIsFirst() {
		return isFirst;
	}

	public void setIsFirst(boolean isFirst) {
		this.isFirst = isFirst;
	}

	public Integer getMerchantStatus() {
		return merchantStatus;
	}

	public void setMerchantStatus(Integer merchantStatus) {
		this.merchantStatus = merchantStatus;
	}

	public Integer getCredits() {
		return credits;
	}

	public void setCredits(Integer credits) {
		this.credits = credits;
	}

	public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
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

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getMerchant() {
        return merchant;
    }

    public void setMerchant(Integer merchant) {
        this.merchant = merchant;
    }
}