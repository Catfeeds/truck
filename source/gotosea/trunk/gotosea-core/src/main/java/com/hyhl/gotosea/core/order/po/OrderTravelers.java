package com.hyhl.gotosea.core.order.po;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.math.BigInteger;

/**
* 订单玩家清单
* @author Leslie.Lam
* @create 2017-08-08 17:46
**/
@Table(name = "t_order_travelers")
public class OrderTravelers {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer orderId;

    private Integer travelerId;

    public OrderTravelers() {
    }

    public OrderTravelers(Integer orderId, Integer travelerId) {
        this.orderId = orderId;
        this.travelerId = travelerId;
    }

    public Integer getTravelerId() {
        return travelerId;
    }

    public void setTravelerId(Integer travelerId) {
        this.travelerId = travelerId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }
}
