package com.hyhl.gotosea.core.order.dto;

import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.NotNull;

/**
* 
* @author Leslie.Lam
* @create 2017-08-15 9:38
**/
public class OrderPay {

    @NotBlank(message = "签名不能为空")
    private String sign;

    @NotBlank(message = "订单编号不能为空")
    private String orderNo;

    @NotBlank(message = "支付金额不能为空")
    private String payFee;

    @NotNull(message = "支付方式不能为空")
    private Integer payType;//支付方式

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

    public String getPayFee() {
        return payFee;
    }

    public void setPayFee(String payFee) {
        this.payFee = payFee;
    }

    public Integer getPayType() {
        return payType;
    }

    public void setPayType(Integer payType) {
        this.payType = payType;
    }
}
