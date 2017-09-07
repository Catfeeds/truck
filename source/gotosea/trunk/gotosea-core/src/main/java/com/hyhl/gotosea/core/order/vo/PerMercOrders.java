package com.hyhl.gotosea.core.order.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hyhl.gotosea.core.common.annotation.Money;
import com.hyhl.gotosea.core.order.enm.MercOrderEnum;

import java.util.Date;

/**
* 
* @author Leslie.Lam
* @create 2017-08-28 17:21
**/
public class PerMercOrders {

    private Integer id;

    private String orderNo;

    private String name;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date serviceDate;

    private Integer serviceNum;//购买数量

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date createTime;

    @Money
    private Integer serviceFee;

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

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Integer getServiceFee() {
        return serviceFee;
    }

    public void setServiceFee(Integer serviceFee) {
        this.serviceFee = serviceFee;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getStatusDesc() {
        return MercOrderEnum.find("status",status);
    }

    public void setStatusDesc(String statusDesc) {
        this.statusDesc = statusDesc;
    }
}
