package com.hyhl.gotosea.core.cust.vo;

import java.math.BigInteger;

import com.hyhl.gotosea.core.common.annotation.FeatureTag;

/**
 * @author guan.sj
 */
public class CustTagVO{
    private BigInteger id;

    /**
     * 特征标签id
     */
    private Integer tagId;
    
    @FeatureTag
    private Integer tagName;

	public BigInteger getId() {
		return id;
	}

	public void setId(BigInteger id) {
		this.id = id;
	}

	public Integer getTagId() {
		return tagId;
	}

	public void setTagId(Integer tagId) {
		this.tagId = tagId;
	}

	public Integer getTagName() {
		return tagId;
	}

	public void setTagName(Integer tagName) {
		this.tagName = tagName;
	}
}