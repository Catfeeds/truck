package com.hyhl.gotosea.core.order.vo;

/**
* 
* @author Leslie.Lam
* @create 2017-08-18 16:54
**/
public class OrderCount {

    private Integer toPay;//待付款

    private Integer toGo;//待出行

    private Integer toEva;//待评价

    private Integer refund;//退款

    public Integer getToPay() {
        return toPay;
    }

    public void setToPay(Integer toPay) {
        this.toPay = toPay;
    }

    public Integer getToGo() {
        return toGo;
    }

    public void setToGo(Integer toGo) {
        this.toGo = toGo;
    }

    public Integer getToEva() {
        return toEva;
    }

    public void setToEva(Integer toEva) {
        this.toEva = toEva;
    }

    public Integer getRefund() {
        return refund;
    }

    public void setRefund(Integer refund) {
        this.refund = refund;
    }
}
