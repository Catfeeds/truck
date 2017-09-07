package com.hyhl.gotosea.core.order.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hyhl.gotosea.core.common.annotation.Money;
import com.hyhl.gotosea.core.order.enm.OrderEnum;

import java.util.Date;

/**
* 
* @author Leslie.Lam
* @create 2017-08-31 16:49
**/
public class PerOrders {

    private Integer id;

    private String orderNo;

    private String sign;

    private Integer serviceTypeId;//服务类型

    @Money
    private Integer payFee;

    private Integer travelersNum;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date departureTime;

    private Integer orderType;

    private String orderTypeDesc;

    private String remark;

    private Integer status;

    private String statusDesc;

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

    public Integer getTravelersNum() {
        return travelersNum;
    }

    public void setTravelersNum(Integer travelersNum) {
        this.travelersNum = travelersNum;
    }

    public Date getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(Date departureTime) {
        this.departureTime = departureTime;
    }

    public Integer getOrderType() {
        return orderType;
    }

    public void setOrderType(Integer orderType) {
        this.orderType = orderType;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getSign() {
        return sign;
    }

    public void setSign(String sign) {
        this.sign = sign;
    }

    public Integer getPayFee() {
        return payFee;
    }

    public void setPayFee(Integer payFee) {
        this.payFee = payFee;
    }

    public String getOrderTypeDesc() {
        return OrderEnum.find("orderType",orderType);
    }

    public void setOrderTypeDesc(String orderTypeDesc) {
        this.orderTypeDesc = orderTypeDesc;
    }

    public String getStatusDesc() {
        return OrderEnum.find("status",status);
    }

    public void setStatusDesc(String statusDesc) {
        this.statusDesc = statusDesc;
    }

    public Integer getServiceTypeId() {
        return serviceTypeId;
    }

    public void setServiceTypeId(Integer serviceTypeId) {
        this.serviceTypeId = serviceTypeId;
    }
}
