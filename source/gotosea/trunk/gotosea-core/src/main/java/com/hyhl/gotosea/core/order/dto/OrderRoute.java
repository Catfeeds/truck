package com.hyhl.gotosea.core.order.dto;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

/**
* 接收线路下单参数
* @author Leslie.Lam
* @create 2017-08-07 15:55
**/
public class OrderRoute extends ComOrderDto {

    @NotNull(message = "购买数量不能为空")
    @Min(value = 1,message = "购买数量不能小于1")
    private Integer num;//购买数量

    public Integer getNum() {
        return num;
    }

    public void setNum(Integer num) {
        this.num = num;
    }
}
