package com.hyhl.gotosea.core.prod.po;

import javax.persistence.*;
import java.util.Date;

/**
* 商家资源
* @author Leslie.Lam
* @create 2017-07-27 14:32
**/
@Table(name = "t_merchant_resource")
public class MerchantResource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    @Column(name = "merchant_resource_type_id")
    private Integer merchantResourceTypeId;

    @Column(name = "locator_id")
    private Integer locatorId;//定位点id

    @Column(name = "cust_id")
    private String custId;//客户id

    @Column(name = "create_time")
    private Date createTime;

    private Integer status;

    private String introduction;//商家资源简介

    private String pictures;//商家资源照片

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

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getMerchantResourceTypeId() {
        return merchantResourceTypeId;
    }

    public void setMerchantResourceTypeId(Integer merchantResourceTypeId) {
        this.merchantResourceTypeId = merchantResourceTypeId;
    }

    public Integer getLocatorId() {
        return locatorId;
    }

    public void setLocatorId(Integer locatorId) {
        this.locatorId = locatorId;
    }

    public String getCustId() {
        return custId;
    }

    public void setCustId(String custId) {
        this.custId = custId;
    }

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    public String getPictures() {
        return pictures;
    }

    public void setPictures(String pictures) {
        this.pictures = pictures;
    }
}
