package com.hyhl.gotosea.core.order.enm;

import java.util.Objects;

/**
 * @author Leslie.Lam
 * @create 2017-07-31 10:17
 **/
public enum OrderEnum {

    /** 订单处理类型 */
    订单提交(1),订单付费(2),订单确认(3),订单出行(4),订单评价(5),
    订单撤销申请(6),订单撤销确认(7),订单撤销退款(8),超时关闭(9),

    /** 下单渠道  */
    支付宝(1),微信支付(2),

    /** 订单类型 */
    活动订单(1,"orderType"), 单品服务订单(2,"orderType"),线路订单(3,"orderType"),

    /** 订单状态 */
    已提交待付费(1,"status"),已付费待确认(2,"status"),已确认待出行(3,"status"),已出行待评价(4,"status"),已评价订单关闭(5,"status"),
    已申请撤销待确认(6,"status"),已确认撤销待退款(7,"status"),已退款订单关闭(8,"status"),超时未支付(9,"status")

    ;
    private Integer code;

    private String field;

    OrderEnum(Integer code) {
        this.code = code;
    }

    OrderEnum(Integer code, String field) {
        this.code = code;
        this.field = field;
    }

    public Integer code() {
        return code;
    }

    public String field() {
        return field;
    }

    public static String find(String field, Integer code){
        OrderEnum[] values = values();
        for (OrderEnum v:values){
            if (Objects.equals(field,v.field())&&Objects.equals(v.code(),code))return v.name();
        }
        return null;
    }
}
