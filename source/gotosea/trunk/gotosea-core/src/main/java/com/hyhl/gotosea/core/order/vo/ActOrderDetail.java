package com.hyhl.gotosea.core.order.vo;

import com.hyhl.gotosea.core.comm.vo.ActivityVo;
import com.hyhl.gotosea.core.common.annotation.Money;

public class ActOrderDetail extends PerOrderDetail{
    @Money
    private Integer aAServePrice;   //aa服务价格
    @Money
    private Integer optServePrice;  //自选服务价格
    private ActivityVo activityVo;

    public ActivityVo getActivityVo() {
        return activityVo;
    }

    public void setActivityVo(ActivityVo activityVo) {
        this.activityVo = activityVo;
    }

    public Integer getaAServePrice() {
        return aAServePrice;
    }

    public void setaAServePrice(Integer aAServePrice) {
        this.aAServePrice = aAServePrice;
    }

    public Integer getOptServePrice() {
        return optServePrice;
    }

    public void setOptServePrice(Integer optServePrice) {
        this.optServePrice = optServePrice;
    }
}
