package com.hyhl.gotosea.core.cust.po;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * 客户表主键生成，请使用 @see PrimaryKeyGenerator 工具生成id
 * @author guan.sj
 */
@Table(name="t_cust")
public class Cust implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
    private String id;

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
     * 微信号
     */
    private String wechat;

    /**
     * 密码
     */
    @JsonIgnore
    private String pwd;

    /**
     * 性别 1男2女3未知
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
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createTime;

    /**
     * 客户状态 0--失效，1--生效
     */
    private Integer status;

    /**
     * 商家标记 0--未申请商家身份，1--已申请商家身份
     */
    private Integer merchant;
    
    /**
     * 商家认证状态 1--未认证，2--已申请，3--认证成功，4--认证失败
     */
    private Integer merchantStatus;
    
    
    /**
     * 玩家积分
     */
    private Integer credits;
    
    /**
     * 经验值
     */
    private Integer experenceValue;
    
    /**
     * 地区
     */
    private Integer areaId;
    
    /**
     * 个性签名
     */
    private String signature;

    public String getSignature() {
		return signature;
	}

	public void setSignature(String signature) {
		this.signature = signature;
	}

	public Integer getExperenceValue() {
		return experenceValue;
	}

	public void setExperenceValue(Integer experenceValue) {
		this.experenceValue = experenceValue;
	}

	public Integer getAreaId() {
		return areaId;
	}

	public void setAreaId(Integer areaId) {
		this.areaId = areaId;
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

	public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public String getWechat() {
        return wechat;
    }

    public void setWechat(String wechat) {
        this.wechat = wechat;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
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