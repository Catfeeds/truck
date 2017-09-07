package com.hyhl.gotosea.core.prod.po;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.util.Date;

/**
* 服务表
* @author Leslie.Lam
* @create 2017-07-27 13:59
**/
@Table(name = "t_service")
public class ProdServe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String code;

    private String name;//服务名称

    @Column(name = "service_type_id")
    private Integer serviceTypeId;//服务类型

    @Column(name = "business_unit_id")
    private Integer businessUnitId;//业务类型

    @Column(name = "cust_id")
    private String custId;//商家id

    @Column(name = "merchant_resource_id")
    private Integer merchantResourceId;//商家资源

    @Column(name = "addition_service")
    private Integer additionService;//附加服务项目标记

    @Column(name = "service_detail")
    private Integer serviceDetail;  //服务明细标记

    @Column(name = "advance_days")
    private Integer advanceDays;//提前预定天数

    private Integer insurance;//保险服务

    private Integer coupon;//支持优惠券

    private Integer redeem;//积分兑换

    private Integer status;//状态

    @Column(name = "create_time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createTime;//创建时间

    @Column(name = "begindate")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date beginDate;//生效时间

    @Column(name = "enddate")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date endDate;//失效时间

    private Integer grade;//评分

    @Column(name = "sold_num")
    private Integer soldNum;//已售数量

    private String price;//价格

    @Column(name = "market_price")
    private Integer marketPrice;//市场价

    @Column(name = "prefer_price")
    private Integer preferPrice;//优惠价

    @Column(name = "cost_price")
    private Integer costPrice;//成本价

    private Integer duration;//出行周期，单位为天

    @Column(name = "price_unit")
    private String priceUnit;//定价单位

    private String fishPointPic;//钓点分布图

    private String picture;//服务图片

    private String carouselPics;//轮播图

    private String thumbnail;//服务缩略图

    private String summary;//服务简介

    private String recommend;//小约推荐

    @Column(name = "min_persons")
    private Integer minPersons;    //人数下限

    @Column(name = "max_persons")
    private Integer maxPersons;    //人数上限

    @Column(name = "area_id")
    private Integer areaId;//区域id

    @Column(name = "pub_resource_type_id")
    private Integer pubResourceTypeId;  //可选公共资源id

    public Integer getServiceDetail() {
        return serviceDetail;
    }

    public void setServiceDetail(Integer serviceDetail) {
        this.serviceDetail = serviceDetail;
    }

    public Integer getPubResourceTypeId() {
        return pubResourceTypeId;
    }

    public void setPubResourceTypeId(Integer pubResourceTypeId) {
        this.pubResourceTypeId = pubResourceTypeId;
    }

    public Integer getMinPersons() {
        return minPersons;
    }

    public void setMinPersons(Integer minPersons) {
        this.minPersons = minPersons;
    }

    public Integer getMaxPersons() {
        return maxPersons;
    }

    public void setMaxPersons(Integer maxPersons) {
        this.maxPersons = maxPersons;
    }

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

    public Integer getServiceTypeId() {
        return serviceTypeId;
    }

    public void setServiceTypeId(Integer serviceTypeId) {
        this.serviceTypeId = serviceTypeId;
    }

    public Integer getBusinessUnitId() {
        return businessUnitId;
    }

    public void setBusinessUnitId(Integer businessUnitId) {
        this.businessUnitId = businessUnitId;
    }

    public String getCustId() {
        return custId;
    }

    public void setCustId(String custId) {
        this.custId = custId;
    }

    public Integer getMerchantResourceId() {
        return merchantResourceId;
    }

    public void setMerchantResourceId(Integer merchantResourceId) {
        this.merchantResourceId = merchantResourceId;
    }

    public Integer getAdditionService() {
        return additionService;
    }

    public void setAdditionService(Integer additionService) {
        this.additionService = additionService;
    }

    public Integer getAdvanceDays() {
        return advanceDays;
    }

    public void setAdvanceDays(Integer advanceDays) {
        this.advanceDays = advanceDays;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Date getBeginDate() {
        return beginDate;
    }

    public void setBeginDate(Date beginDate) {
        this.beginDate = beginDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Integer getGrade() {
        return grade;
    }

    public void setGrade(Integer grade) {
        this.grade = grade;
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

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
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

    public Integer getRedeem() {
        return redeem;
    }

    public void setRedeem(Integer redeem) {
        this.redeem = redeem;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getRecommend() {
        return recommend;
    }

    public void setRecommend(String recommend) {
        this.recommend = recommend;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Integer getAreaId() {
        return areaId;
    }

    public void setAreaId(Integer areaId) {
        this.areaId = areaId;
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

    public String getCarouselPics() {
        return carouselPics;
    }

    public void setCarouselPics(String carouselPics) {
        this.carouselPics = carouselPics;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public String getFishPointPic() {
        return fishPointPic;
    }

    public void setFishPointPic(String fishPointPic) {
        this.fishPointPic = fishPointPic;
    }
}
