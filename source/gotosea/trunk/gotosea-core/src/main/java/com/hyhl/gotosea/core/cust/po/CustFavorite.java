package com.hyhl.gotosea.core.cust.po;

import java.io.Serializable;
import java.math.BigInteger;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author guan.sj
 */
@Table(name="t_cust_favorite")
public class CustFavorite implements Serializable {
    /**
     * 客户收藏id
     */
	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY)
    private BigInteger id;

    /**
     * 客户id
     */
	@JsonIgnore
    private String custId;

    /**
     * 模板id
     */
    private String targetId;

    /**
     * 目标类型:
		1-动态
		2-活动
		3-服务
		4-文章
     */
    private Integer targetType;

    private static final long serialVersionUID = 1L;

	public CustFavorite() {
	}

	public CustFavorite(String custId, String targetId, Integer targetType) {
		this.custId = custId;
		this.targetId = targetId;
		this.targetType = targetType;
	}

	public BigInteger getId() {
		return id;
	}

	public void setId(BigInteger id) {
		this.id = id;
	}

	public String getCustId() {
		return custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}

	public String getTargetId() {
		return targetId;
	}

	public void setTargetId(String targetId) {
		this.targetId = targetId;
	}

	public Integer getTargetType() {
		return targetType;
	}

	public void setTargetType(Integer targetType) {
		this.targetType = targetType;
	}
}