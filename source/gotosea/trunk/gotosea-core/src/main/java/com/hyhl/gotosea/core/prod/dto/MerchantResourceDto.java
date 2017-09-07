package com.hyhl.gotosea.core.prod.dto;

import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.NotNull;

public class MerchantResourceDto {
    @NotBlank
    private String name;
    @NotNull
    private Integer merchantResourceTypeId; //资源类型
    @NotNull
    private Integer locatorId;//定位点id
    @NotBlank
    private String custId;//客户id (该资源属于哪个用户)

    private String introduction;//商家资源简介

    private String pictures;//商家资源照片

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
