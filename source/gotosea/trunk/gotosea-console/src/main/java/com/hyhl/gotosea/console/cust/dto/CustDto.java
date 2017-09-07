package com.hyhl.gotosea.console.cust.dto;

public class CustDto {
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
     * 性别 1男2女3未知
     */
    private Integer sex;

    /**
     * 客户级别
     */
    private Integer level;

    /**
     * 注册时间-yyyy-MM-dd
     */
    private String createTime;

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

	public Integer getLevel() {
		return level;
	}

	public void setLevel(Integer level) {
		this.level = level;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
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

	public Integer getExperenceValue() {
		return experenceValue;
	}

	public void setExperenceValue(Integer experenceValue) {
		this.experenceValue = experenceValue;
	}
}
