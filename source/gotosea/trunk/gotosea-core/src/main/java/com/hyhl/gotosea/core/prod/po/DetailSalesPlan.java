package com.hyhl.gotosea.core.prod.po;

import javax.persistence.*;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
* 服务明细项销售计划
* @author Leslie.Lam
* @create 2017-07-31 9:59
**/
@Table(name = "t_service_detail_sales_plan")
public class DetailSalesPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "service_detail_id")
    private Integer serviceDetailId;

    @Column(name = "offer_date")
    private Date offerDate;//服务提供日期

    @Column(name = "market_price")
    private Integer marketPrice;//市场价

    @Column(name = "prefer_price")
    private Integer preferPrice;//优惠价

    @Column(name = "cost_price")
    private Integer costPrice;//成本价

    @Column(name = "num_to_sale")
    private Integer numToSale;//可售数量

    @Column(name = "num_sold")
    private Integer numSold;//已售数量

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getServiceDetailId() {
        return serviceDetailId;
    }

    public void setServiceDetailId(Integer serviceDetailId) {
        this.serviceDetailId = serviceDetailId;
    }

    public Date getOfferDate() {
//        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        return /*sdf.format(offerDate);*/offerDate;
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
}
