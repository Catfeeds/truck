package com.hyhl.gotosea.core.order.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.hyhl.gotosea.core.common.annotation.Money;
import com.hyhl.gotosea.core.common.serialize.MercSerializer;

import java.util.Date;

/**
* 
* @author Leslie.Lam
* @create 2017-08-29 10:48
**/
public class MercOrderDetail {

    private Integer id;

    private String orderNo;

    @Money
    private Integer serviceFee;//订单总额

    @JsonSerialize(using = MercSerializer.class)
    private String merchant;//商家信息

    private String name;//服务名称

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date serviceDate;//出行日期

    private Integer serviceNum;//预订数量

    private Integer travelersNum;//出行人数

    private Integer orderType;//1-活动订单,2-单品服务订单

    private String contacter;//预订人姓名

    private String contacterPhone;//预订人手机

    private String contacterRemark;//预订人备注

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

    public Integer getServiceFee() {
        return serviceFee;
    }

    public void setServiceFee(Integer serviceFee) {
        this.serviceFee = serviceFee;
    }

    public String getMerchant() {
        return merchant;
    }

    public void setMerchant(String merchant) {
        this.merchant = merchant;
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

    public Integer getServiceNum() {
        return serviceNum;
    }

    public void setServiceNum(Integer serviceNum) {
        this.serviceNum = serviceNum;
    }

    public Integer getTravelersNum() {
        return travelersNum;
    }

    public void setTravelersNum(Integer travelersNum) {
        this.travelersNum = travelersNum;
    }

    public Integer getOrderType() {
        return orderType;
    }

    public void setOrderType(Integer orderType) {
        this.orderType = orderType;
    }

    public String getContacter() {
        return contacter;
    }

    public void setContacter(String contacter) {
        this.contacter = contacter;
    }

    public String getContacterPhone() {
        return contacterPhone;
    }

    public void setContacterPhone(String contacterPhone) {
        this.contacterPhone = contacterPhone;
    }

    public String getContacterRemark() {
        return contacterRemark;
    }

    public void setContacterRemark(String contacterRemark) {
        this.contacterRemark = contacterRemark;
    }
}
