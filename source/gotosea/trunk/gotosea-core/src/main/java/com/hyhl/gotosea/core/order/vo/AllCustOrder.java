package com.hyhl.gotosea.core.order.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.hyhl.gotosea.core.common.annotation.Money;
import com.hyhl.gotosea.core.common.serialize.ServeTypeSerializer;

import java.util.Date;

/**
* 
* @author Leslie.Lam
* @create 2017-08-29 11:48
**/
public class AllCustOrder {

    private Integer id;

    private String orderNo;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date createTime;//创建时间

    @Money
    private Integer payFee;//实收金额

    private Integer status;

    private String name;//服务名

    @JsonSerialize(using = ServeTypeSerializer.class)
    private Integer serviceTypeId;//服务类型

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date serviceDate;//出行时间

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

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Integer getPayFee() {
        return payFee;
    }

    public void setPayFee(Integer payFee) {
        this.payFee = payFee;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
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

    public Date getServiceDate() {
        return serviceDate;
    }

    public void setServiceDate(Date serviceDate) {
        this.serviceDate = serviceDate;
    }
}
