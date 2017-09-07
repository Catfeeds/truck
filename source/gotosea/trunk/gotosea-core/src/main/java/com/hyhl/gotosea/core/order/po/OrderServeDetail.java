package com.hyhl.gotosea.core.order.po;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
* 订单服务明细
* @author Leslie.Lam
* @create 2017-08-08 17:41
**/
@Table(name = "t_order_service_detail")
public class OrderServeDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer serviceDetailId;

    private Integer orderServiceId;

    private Integer serviceDetailNum;

    private Integer preferPrice;

    private Integer marketPrice;

    private Integer costPrice;

    public Integer getServiceDetailId() {
        return serviceDetailId;
    }

    public void setServiceDetailId(Integer serviceDetailId) {
        this.serviceDetailId = serviceDetailId;
    }

    public Integer getOrderServiceId() {
        return orderServiceId;
    }

    public void setOrderServiceId(Integer orderServiceId) {
        this.orderServiceId = orderServiceId;
    }

    public Integer getServiceDetailNum() {
        return serviceDetailNum;
    }

    public void setServiceDetailNum(Integer serviceDetailNum) {
        this.serviceDetailNum = serviceDetailNum;
    }

    public Integer getPreferPrice() {
        return preferPrice;
    }

    public void setPreferPrice(Integer preferPrice) {
        this.preferPrice = preferPrice;
    }

    public Integer getMarketPrice() {
        return marketPrice;
    }

    public void setMarketPrice(Integer marketPrice) {
        this.marketPrice = marketPrice;
    }

    public Integer getCostPrice() {
        return costPrice;
    }

    public void setCostPrice(Integer costPrice) {
        this.costPrice = costPrice;
    }
}
