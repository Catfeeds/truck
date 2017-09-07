package com.hyhl.gotosea.core.order.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.hyhl.gotosea.core.common.serialize.MercSerializer;

import java.util.Date;

/**
* 
* @author Leslie.Lam
* @create 2017-08-28 17:21
**/
public class AllMercOrder {

    private Integer id;

    private String orderNo;

    private String name;//服务名称

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date serviceDate;//出行时间

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date createTime;//创建时间

    private Integer status;//0不可用，1可用

    @JsonSerialize(using = MercSerializer.class)
    private String merchant;//商家名称

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getServiceDate() {
        return serviceDate;
    }

    public void setServiceDate(Date serviceDate) {
        this.serviceDate = serviceDate;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getMerchant() {
        return merchant;
    }

    public void setMerchant(String merchant) {
        this.merchant = merchant;
    }
}
