package com.hyhl.common.exception.type;

import com.hyhl.common.exception.IBaseBusinessError;

import java.util.Locale;

public enum OrderError implements IBaseBusinessError {
    ORDER_NOT_FOUND(404,"订单不存在","ORDER_NOT_FOUND"),
    TIME_INVALID(400,"出行时间不能小于当前时间","TIME_INVALID"),
    UNSUPPOT_COUPON(400,"该服务不支持使用优惠券","UNSUPPOT_COUPON"),
    SALE_OUT(401,"本服务于所选日期已售罄","SALE_OUT"),
    UNBELONG(403,"该优惠券非本人持有","UNBELONG"),
    NON_COUPON(402,"无可用优惠券","NON_COUPON"),
    INVALID_COUPON(402,"无效的优惠券","INVALID_COUPON"),
    DISSATIFY(403,"下单未达到满减金额","DISSATIFY"),
    NOT_IN_EFFECT(402,"未生效的优惠券","NOT_IN_EFFECT"),
    PAY_FAIL(405,"支付失败","PAY_FAIL"),
    ORDER_OVERTIME(405,"订单超时","ORDER_OVERTIME"),
    PAYFEE_WRONG(400,"支付金额错误","PAYFEE_WRONG"),
    INVALID_SERVE(401,"服务未生效或已过期","INVALID_SERVE")
    ;

    int status;

    String message;

    String code;

    OrderError(int status,String message,String code){
        this.status = status;
        this.message = message;
        this.code = code;
    }

    @Override
    public int getStatus() {
        return this.status;
    }

    @Override
    public String getMessage() {
        return this.message;
    }

    @Override
    public String getCode() {
        return String.valueOf(this.status);
    }

    @Override
    public String getMessage(Locale locale) {
        return this.message;
    }
}
