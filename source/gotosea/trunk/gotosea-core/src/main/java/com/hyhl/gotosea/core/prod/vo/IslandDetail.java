package com.hyhl.gotosea.core.prod.vo;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.hyhl.gotosea.core.common.annotation.NumberConvert;
import com.hyhl.gotosea.core.common.annotation.Split;
import com.hyhl.gotosea.core.common.serialize.ServeTagSerializer;

import java.util.List;

/**
* 海岛游详情
* @author Leslie.Lam
* @create 2017-08-01 13:59
**/
public class IslandDetail {

    private Integer id;

    private String picture;//图片

    private String name;//线路名

    private String price;//显示价格

    @NumberConvert(divide = 100)
    private Integer preferPrice;//默认价格

    private Integer soldNum;//已售数量

    private String grade;//评分

    private Integer advanceDays;//提前预定天数

    private Integer coupon;//是否支持优惠券

    private Integer insurance;//是否购买保险

    private Integer redeem;//是否支持积分

    @Split("#")
    private String recommend;//小约推荐

    private String destination;//目的地

    private Integer category;//服务类别

    @Split(",")
    private String carouselPics;//轮播图片

    @JsonSerialize(using = ServeTagSerializer.class)
    private List<Integer> tags;//特征标签

    private String serveInfos;

    private boolean flag;//是否收藏

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

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public Integer getSoldNum() {
        return soldNum;
    }

    public void setSoldNum(Integer soldNum) {
        this.soldNum = soldNum;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public Integer getCoupon() {
        return coupon;
    }

    public void setCoupon(Integer coupon) {
        this.coupon = coupon;
    }

    public Integer getInsurance() {
        return insurance;
    }

    public void setInsurance(Integer insurance) {
        this.insurance = insurance;
    }

    public Integer getRedeem() {
        return redeem;
    }

    public void setRedeem(Integer redeem) {
        this.redeem = redeem;
    }

    public List<Integer> getTags() {
        return tags;
    }

    public void setTags(List<Integer> tags) {
        this.tags = tags;
    }

    public String getRecommend() {
        return recommend;
    }

    public void setRecommend(String recommend) {
        this.recommend = recommend;
    }

    public Integer getAdvanceDays() {
        return advanceDays;
    }

    public void setAdvanceDays(Integer advanceDays) {
        this.advanceDays = advanceDays;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public Integer getCategory() {
        return category;
    }

    public void setCategory(Integer category) {
        this.category = category;
    }

    public boolean isFlag() {
        return flag;
    }

    public void setFlag(boolean flag) {
        this.flag = flag;
    }

    public String getServeInfos() {
        return serveInfos;
    }

    public void setServeInfos(String serveInfos) {
        this.serveInfos = serveInfos;
    }

    public Integer getPreferPrice() {
        return preferPrice;
    }

    public void setPreferPrice(Integer preferPrice) {
        this.preferPrice = preferPrice;
    }

    public String getCarouselPics() {
        return carouselPics;
    }

    public void setCarouselPics(String carouselPics) {
        this.carouselPics = carouselPics;
    }
}
