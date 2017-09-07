package com.hyhl.gotosea.core.order.po;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

/**
* 订单服务
* @author Leslie.Lam
* @create 2017-08-08 17:36
**/
@Table(name = "t_order_service")
public class OrderServe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private Integer orderId;

    private Integer serviceId;

    private Integer serviceTypeId;//服务类型

    private Integer activityServiceType;//1--AA付费项目,2--自选付费项目

    private Integer merchantOrderId;//商家订单id

    private Date serviceDate;

    private Integer serviceNum;

    private Integer preferPrice;

    private Integer marketPrice;

    private Integer costPrice;

    public OrderServe() {
    }

    public OrderServe(Integer orderId) {
        this.orderId = orderId;
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

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public Integer getServiceId() {
        return serviceId;
    }

    public void setServiceId(Integer serviceId) {
        this.serviceId = serviceId;
    }

    public Integer getActivityServiceType() {
        return activityServiceType;
    }

    public void setActivityServiceType(Integer activityServiceType) {
        this.activityServiceType = activityServiceType;
    }

    public Date getServiceDate() {
        return serviceDate;
    }

    public void setServiceDate(Date serviceDate) {
        this.serviceDate = serviceDate;
    }

    public Integer getServiceNum() {
        return serviceNum;
    }

    public void setServiceNum(Integer serviceNum) {
        this.serviceNum = serviceNum;
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

    public Integer getMerchantOrderId() {
        return merchantOrderId;
    }

    public void setMerchantOrderId(Integer merchantOrderId) {
        this.merchantOrderId = merchantOrderId;
    }

    public Integer getServiceTypeId() {
        return serviceTypeId;
    }

    public void setServiceTypeId(Integer serviceTypeId) {
        this.serviceTypeId = serviceTypeId;
    }
}
