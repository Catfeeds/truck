package com.hyhl.gotosea.core.order.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hyhl.gotosea.core.common.annotation.Money;
import com.hyhl.gotosea.core.order.enm.OrderEnum;

import java.util.Date;

/**
* 
* @author Leslie.Lam
* @create 2017-08-14 19:31
**/
public class OrderResult {

    private Integer orderId;

    private String sign;

    private String orderNo;

    @Money
    private Integer payFee;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date orderTime;

    private String restTime;//剩余支付时间

    private Integer orderType;//订单类型

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date departureTime;

    private String remark;

    private Integer travelersNum;

    private Integer num;

    private String orderTypeDesc;

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public String getSign() {
        return sign;
    }

    public void setSign(String sign) {
        this.sign = sign;
    }

    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }

    public Integer getPayFee() {
        return payFee;
    }

    public void setPayFee(Integer payFee) {
        this.payFee = payFee;
    }

    public Date getOrderTime() {
        return orderTime;
    }

    public void setOrderTime(Date orderTime) {
        this.orderTime = orderTime;
    }

    public String getRestTime() {
        return restTime;
    }

    public void setRestTime(String restTime) {
        this.restTime = restTime;
    }

    public Integer getOrderType() {
        return orderType;
    }

    public void setOrderType(Integer orderType) {
        this.orderType = orderType;
    }

    public Date getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(Date departureTime) {
        this.departureTime = departureTime;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Integer getTravelersNum() {
        return travelersNum;
    }

    public void setTravelersNum(Integer travelersNum) {
        this.travelersNum = travelersNum;
    }

    public String getOrderTypeDesc() {
        return OrderEnum.find("orderType",orderType);
    }

    public void setOrderTypeDesc(String orderTypeDesc) {
        this.orderTypeDesc = orderTypeDesc;
    }

    public Integer getNum() {
        return num;
    }

    public void setNum(Integer num) {
        this.num = num;
    }
}
