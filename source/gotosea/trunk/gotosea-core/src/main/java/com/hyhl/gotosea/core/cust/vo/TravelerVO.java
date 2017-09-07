package com.hyhl.gotosea.core.cust.vo;

import com.hyhl.gotosea.core.common.annotation.Dict;

/**
 * @author guan.sj
 */
public class TravelerVO {
    /**
     * 玩家ID
     */
    private Integer id;

    /**
     * 客户ID
     */
    private String custId;

    /**
     * 玩家真实姓名
     */
    private String name;

    /**
     * 玩家证件类型
     */
    private Integer credType;
    
    @Dict(name="cust_cred_type")
    private Integer credTypeName;

    /**
     * 玩家证件号码
     */
    private String credNum;

    /**
     * 玩家标记（本人/同伴）
     */
    private Integer myself;
    

	public Integer getCredTypeName() {
		return credType;
	}

	public void setCredTypeName(Integer credTypeName) {
		this.credTypeName = credTypeName;
	}

	public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCustId() {
        return custId;
    }

    public void setCustId(String custId) {
        this.custId = custId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getCredType() {
        return credType;
    }

    public void setCredType(Integer credType) {
        this.credType = credType;
    }

    public String getCredNum() {
        return credNum;
    }

    public void setCredNum(String credNum) {
        this.credNum = credNum;
    }

    public Integer getMyself() {
        return myself;
    }

    public void setMyself(Integer myself) {
        this.myself = myself;
    }
}