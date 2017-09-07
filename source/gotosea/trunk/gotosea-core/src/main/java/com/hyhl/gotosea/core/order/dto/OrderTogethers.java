package com.hyhl.gotosea.core.order.dto;

import java.util.List;

/**
* 
* @author Leslie.Lam
* @create 2017-08-14 14:53
**/
public class OrderTogethers {

    private Integer orderId;

    private List<Integer> togethers;

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public List<Integer> getTogethers() {
        return togethers;
    }

    public void setTogethers(List<Integer> togethers) {
        this.togethers = togethers;
    }

}
