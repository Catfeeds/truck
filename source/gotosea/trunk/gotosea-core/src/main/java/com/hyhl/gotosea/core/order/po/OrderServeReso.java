package com.hyhl.gotosea.core.order.po;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
* 订单与公共资源关系表
* @author Leslie.Lam
* @create 2017-08-08 17:44
**/
@Table(name = "t_order_service_resource")
public class OrderServeReso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer pubResourceId;

    private Integer orderServiceId;

    private Integer marketPrice;//市场价

    private Integer preferPrice;//优惠价

    private Integer costPrice;//成本价

    public OrderServeReso() {
    }

    public OrderServeReso(Integer pubResourceId, Integer orderServiceId) {
        this.pubResourceId = pubResourceId;
        this.orderServiceId = orderServiceId;
    }

    public OrderServeReso(Integer pubResourceId, Integer orderServiceId, Integer marketPrice, Integer preferPrice, Integer costPrice) {
        this.pubResourceId = pubResourceId;
        this.orderServiceId = orderServiceId;
        this.marketPrice = marketPrice;
        this.preferPrice = preferPrice;
        this.costPrice = costPrice;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getPubResourceId() {
        return pubResourceId;
    }

    public void setPubResourceId(Integer pubResourceId) {
        this.pubResourceId = pubResourceId;
    }

    public Integer getOrderServiceId() {
        return orderServiceId;
    }

    public void setOrderServiceId(Integer orderServiceId) {
        this.orderServiceId = orderServiceId;
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
}
