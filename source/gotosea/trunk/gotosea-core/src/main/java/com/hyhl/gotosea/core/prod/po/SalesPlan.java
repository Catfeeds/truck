package com.hyhl.gotosea.core.prod.po;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hyhl.gotosea.core.common.annotation.Money;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

/**
* 服务销售计划
* @author Leslie.Lam
* @create 2017-07-31 9:49
**/
@Table(name = "t_service_sales_plan")
public class SalesPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "service_id")
    private Integer serviceId;

    private Integer resourcePriceTag;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @NotNull(message = "服务提供日期不能为空")
    private Date offerDate;//服务提供日期

    @NotNull(message = "市场价不能为空")
    @Money
    private Integer marketPrice;//市场价

    @NotNull(message = "优惠价不能为空")
    @Money
    private Integer preferPrice;//优惠价

    @NotNull(message = "成本价不能为空")
    @Money
    private Integer costPrice;//成本价

    @NotNull(message = "可售数量不能为空")
    private Integer numToSale;//可售数量

    @Column(name = "num_sold")
    private Integer numSold;//已售数量

    public SalesPlan() {
    }

    public SalesPlan(Integer serviceId, Date offerDate) {
        this.serviceId = serviceId;
        this.offerDate = offerDate;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getServiceId() {
        return serviceId;
    }

    public void setServiceId(Integer serviceId) {
        this.serviceId = serviceId;
    }

    public Date getOfferDate() {
        return offerDate;
    }

    public void setOfferDate(Date offerDate) {
        this.offerDate = offerDate;
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

    public Integer getNumToSale() {
        return numToSale;
    }

    public void setNumToSale(Integer numToSale) {
        this.numToSale = numToSale;
    }

    public Integer getNumSold() {
        return numSold;
    }

    public void setNumSold(Integer numSold) {
        this.numSold = numSold;
    }

    public Integer getResourcePriceTag() {
        return resourcePriceTag;
    }

    public void setResourcePriceTag(Integer resourcePriceTag) {
        this.resourcePriceTag = resourcePriceTag;
    }
}
