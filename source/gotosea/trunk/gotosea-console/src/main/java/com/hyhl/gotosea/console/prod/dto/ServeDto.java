package com.hyhl.gotosea.console.prod.dto;

import com.hyhl.gotosea.core.common.annotation.Money;
import com.hyhl.gotosea.core.common.annotation.Split;
import com.hyhl.gotosea.core.prod.po.ServiceInfo;
import org.hibernate.validator.constraints.NotBlank;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
* 
* @author Leslie.Lam
* @create 2017-08-18 14:55
**/
public class ServeDto {

    private Integer id;

    private String code;//编号

    @NotBlank(message = "服务名称不能为空")
    private String name;//服务名称

    @NotNull(message = "服务类型不能为空")
    private Integer serviceTypeId;//服务类型

    @NotNull(message = "业务类型不能为空")
    private Integer businessUnitId;//业务类型

    @NotNull(message = "提前预定天数不能为空")
    private Integer advanceDays;//提前预定天数

    @NotNull(message = "是否购买保险服务不能为空")
    private Integer insurance;//是否购买保险服务

    @NotNull(message = "是否支持优惠券不能为空")
    private Integer coupon;//是否支持优惠券

    private Integer status;//状态

    private Integer soldNum;//已售数量

    @NotBlank(message = "价格不能为空")
    private String price;//价格

    @NotNull(message = "市场价不能为空")
    @Money
    private Integer marketPrice;//市场价

    @NotNull(message = "优惠价不能为空")
    @Money
    private Integer preferPrice;//优惠价

    @NotNull(message = "成本价不能为空")
    @Money
    private Integer costPrice;//成本价

    @NotBlank(message = "定价单位不能为空")
    private String priceUnit;//定价单位

    @NotBlank(message = "服务图片不能为空")
    private String picture;//服务图片

    @NotBlank(message = "轮播图不能为空")
    @Split(",")
    private String carouselPics;//轮播图

    @Valid
    private List<ServiceInfo> infos;//详情信息

    private List<Integer> tags;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getBusinessUnitId() {
        return businessUnitId;
    }

    public void setBusinessUnitId(Integer businessUnitId) {
        this.businessUnitId = businessUnitId;
    }

    public Integer getAdvanceDays() {
        return advanceDays;
    }

    public void setAdvanceDays(Integer advanceDays) {
        this.advanceDays = advanceDays;
    }

    public Integer getInsurance() {
        return insurance;
    }

    public void setInsurance(Integer insurance) {
        this.insurance = insurance;
    }

    public Integer getCoupon() {
        return coupon;
    }

    public void setCoupon(Integer coupon) {
        this.coupon = coupon;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getSoldNum() {
        return soldNum;
    }

    public void setSoldNum(Integer soldNum) {
        this.soldNum = soldNum;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public Integer getMarketPrice() {
        return marketPrice;
    }

    public void setMarketPrice(Integer marketPrice) {
        this.marketPrice = marketPrice;
    }

    public Integer getPreferPrice() {
        return preferPrice;
    }

    public void setPreferPrice(Integer preferPrice) {
        this.preferPrice = preferPrice;
    }

    public Integer getCostPrice() {
        return costPrice;
    }

    public void setCostPrice(Integer costPrice) {
        this.costPrice = costPrice;
    }

    public String getPriceUnit() {
        return priceUnit;
    }

    public void setPriceUnit(String priceUnit) {
        this.priceUnit = priceUnit;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public String getCarouselPics() {
        return carouselPics;
    }

    public void setCarouselPics(String carouselPics) {
        this.carouselPics = carouselPics;
    }

    public List<ServiceInfo> getInfos() {
        return infos;
    }

    public void setInfos(List<ServiceInfo> infos) {
        this.infos = infos;
    }

    public Integer getServiceTypeId() {
        return serviceTypeId;
    }

    public void setServiceTypeId(Integer serviceTypeId) {
        this.serviceTypeId = serviceTypeId;
    }

    public List<Integer> getTags() {
        return tags;
    }

    public void setTags(List<Integer> tags) {
        this.tags = tags;
    }
}
