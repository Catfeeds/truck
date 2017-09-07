package com.hyhl.gotosea.core.order.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.hyhl.gotosea.core.common.annotation.Money;
import com.hyhl.gotosea.core.common.serialize.CustSerializer;
import com.hyhl.gotosea.core.common.serialize.MercSerializer;
import com.hyhl.gotosea.core.common.serialize.ServeTypeSerializer;
import com.hyhl.gotosea.core.common.serialize.TravelerSerializer;

import java.util.Date;
import java.util.List;

/**
* 
* @author Leslie.Lam
* @create 2017-08-29 14:19
**/
public class CustOrderDetail {

    private Integer id;

    private String orderNo;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date createTime;

    @Money
    private Integer payFee;//实收金额

    @Money
    private Integer preferPrice;//订单总额

    private Integer travelersNum;//出行人数

    @JsonSerialize(using = CustSerializer.class)
    private String cust;//下单用户

    private String contacter;//预订人姓名

    private String contacterPhone;//预订人手机

    private String contacterRemark;//预订人备注

    private Integer status;//订单状态

    private String name;//服务名称

    @JsonSerialize(using = ServeTypeSerializer.class)
    private Integer serviceTypeId;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date serviceDate;//出行时间

    private Integer serviceNum;//预订数量

    @JsonSerialize(using = MercSerializer.class)
    private String merchant;//商家信息

    @JsonSerialize(using = TravelerSerializer.class)
    private List<Integer> travelers;//出行人员

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

    public Integer getPreferPrice() {
        return preferPrice;
    }

    public void setPreferPrice(Integer preferPrice) {
        this.preferPrice = preferPrice;
    }

    public Integer getTravelersNum() {
        return travelersNum;
    }

    public void setTravelersNum(Integer travelersNum) {
        this.travelersNum = travelersNum;
    }

    public String getCust() {
        return cust;
    }

    public void setCust(String cust) {
        this.cust = cust;
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

    public Integer getServiceNum() {
        return serviceNum;
    }

    public void setServiceNum(Integer serviceNum) {
        this.serviceNum = serviceNum;
    }

    public String getMerchant() {
        return merchant;
    }

    public void setMerchant(String merchant) {
        this.merchant = merchant;
    }

    public List<Integer> getTravelers() {
        return travelers;
    }

    public void setTravelers(List<Integer> travelers) {
        this.travelers = travelers;
    }
}
