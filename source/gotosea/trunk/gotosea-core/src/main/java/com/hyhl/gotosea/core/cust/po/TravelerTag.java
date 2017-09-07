package com.hyhl.gotosea.core.cust.po;

import java.io.Serializable;
import java.math.BigInteger;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author guan.sj
 */
@Table(name="t_traveler_tag")
public class TravelerTag implements Serializable {
    /**
     * 玩家标签ID
     */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private BigInteger id;

    /**
     * 客户id
     */
    private String custId;

    /**
     * 特征标签id
     */
    private Integer tagId;

    private static final long serialVersionUID = 1L;

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

    public Integer getTagId() {
        return tagId;
    }

    public void setTagId(Integer tagId) {
        this.tagId = tagId;
    }
}