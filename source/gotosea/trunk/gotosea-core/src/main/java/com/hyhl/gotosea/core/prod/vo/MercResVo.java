package com.hyhl.gotosea.core.prod.vo;

public class MercResVo {
    private Integer id;

    private Integer status;

    private String name;

    private Integer merchantResourceTypeId;

    private String merchantResourceTypeName;    //商家资源类型名称

    private Integer locatorId;//定位点id

    private String locatorName; //定位点名称

    private String custId;//客户id

    private String custName;    //所属商家名称

    private String introduction;//商家资源简介

    private String pictures;//商家资源照片

    private String [] pictureArr;

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String[] getPictureArr() {
        return pictureArr;
    }

    public void setPictureArr(String[] pictureArr) {
        this.pictureArr = pictureArr;
    }

    public String getCustName() {
        return custName;
    }

    public void setCustName(String custName) {
        this.custName = custName;
    }

    public String getLocatorName() {
        return locatorName;
    }

    public void setLocatorName(String locatorName) {
        this.locatorName = locatorName;
    }

    public String getMerchantResourceTypeName() {
        return merchantResourceTypeName;
    }

    public void setMerchantResourceTypeName(String merchantResourceTypeName) {
        this.merchantResourceTypeName = merchantResourceTypeName;
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
