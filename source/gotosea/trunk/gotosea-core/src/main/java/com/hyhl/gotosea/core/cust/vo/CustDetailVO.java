package com.hyhl.gotosea.core.cust.vo;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.hyhl.gotosea.core.common.annotation.Area;
import com.hyhl.gotosea.core.common.annotation.Dict;
import com.hyhl.gotosea.core.ref.serializer.FeatureTagsToStringSerializer;

/**
 * @author guan.sj
 */
public class CustDetailVO{

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
    
    /**
     * 经验值
     */
    private Integer experenceValue;
    
    /**
     * 地区
     */
    private Integer areaId;
    
    private boolean isFirst=false;
    
    /**
     * 地址
     */
    @Area
    private Integer address;
    
//    /**
//     * 玩家兴趣标签
//     */
//    private List<MerchantTagVO> tags;
    
    private List<Integer> tagIds;
    
    
    /**
     * 玩家兴趣标签拼装字段，以,为分隔符
     */
    @JsonSerialize(using=FeatureTagsToStringSerializer.class)
    private List<Integer> tagsName;
    
    @Dict(name="user_sex")
    private Integer sexName;
    
	public Integer getSexName() {
		return sex;
	}

	public void setSexName(Integer sexName) {
		this.sexName = sexName;
	}

	public List<Integer> getTagIds() {
		return tagIds;
	}

	public void setTagIds(List<Integer> tagIds) {
		this.tagIds = tagIds;
	}

	public List<Integer> getTagsName() {
		return tagIds;
	}

	public void setTagsName(List<Integer> tagsName) {
		this.tagsName = tagsName;
	}

	public Integer getAreaId() {
		return areaId;
	}

	public void setAreaId(Integer areaId) {
		this.areaId = areaId;
	}

	public Integer getExperenceValue() {
		return experenceValue;
	}

	public void setExperenceValue(Integer experenceValue) {
		this.experenceValue = experenceValue;
	}

	public Integer getAddress() {
		return areaId;
	}

	public void setAddress(Integer address) {
		this.address = address;
	}

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