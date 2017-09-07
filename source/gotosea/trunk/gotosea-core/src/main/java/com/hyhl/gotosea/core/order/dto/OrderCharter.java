package com.hyhl.gotosea.core.order.dto;

import javax.validation.constraints.NotNull;

/**
* 接收租船服务下单参数
* @author Leslie.Lam
* @create 2017-08-07 15:55
**/
public class OrderCharter extends ComOrderDto{

    @NotNull(message = "钓点id不能为空")
    private Integer point;//钓点id

    public Integer getPoint() {
        return point;
    }

    public void setPoint(Integer point) {
        this.point = point;
    }
}
