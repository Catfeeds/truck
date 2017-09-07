package com.hyhl.gotosea.core.prod.vo;

import com.hyhl.gotosea.core.common.annotation.Grade;
import com.hyhl.gotosea.core.common.annotation.Split;

import java.util.List;

/**
* 
* @author Leslie.Lam
* @create 2017-08-03 14:19
**/
public class MerchantDetail {

    private String custId;//客户id

    private String merchant;//商家名称

    @Grade
    private Integer grade;//商家评分

    private String address;//商家地址

    private String introduction;//商家资源简介

    @Split(",")
    private String carouselPics;//商家资源照片

    private List<String> resources;//商家资源

    private List<MercServe> mercServes;//商家服务列表

    public String getMerchant() {
        return merchant;
    }

    public void setMerchant(String merchant) {
        this.merchant = merchant;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
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

    public String getCarouselPics() {
        return carouselPics;
    }

    public void setCarouselPics(String carouselPics) {
        this.carouselPics = carouselPics;
    }

    public List<MercServe> getMercServes() {
        return mercServes;
    }

    public void setMercServes(List<MercServe> mercServes) {
        this.mercServes = mercServes;
    }

    public List<String> getResources() {
        return resources;
    }

    public void setResources(List<String> resources) {
        this.resources = resources;
    }

    public Integer getGrade() {
        return grade;
    }

    public void setGrade(Integer grade) {
        this.grade = grade;
    }
}
