package com.hyhl.gotosea.core.order.dto;

/**
* 
* @author Leslie.Lam
* @create 2017-08-29 13:49
**/
public class AllCustOrderDto {

    private Integer status;

    private String orderNo;

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }
}
