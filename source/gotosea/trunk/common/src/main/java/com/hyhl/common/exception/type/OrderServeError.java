package com.hyhl.common.exception.type;

import com.hyhl.common.exception.BaseBusinessError;
import com.hyhl.common.exception.IBaseBusinessError;

import java.util.Locale;

public enum OrderServeError implements IBaseBusinessError {
    ORDER_SERVICE_NOT_FOUND(200,"服务订单不存在","ORDER_SERVICE_NOT_FOUND"),
    ORDER_SERVICE_NOT_HAVE_EVA(200,"服务订单没有评价","ORDER_SERVICE_NOT_HAVE_EVA"),
    ORDER_EVA_NOT_EXIST(200,"订单服务评价不存在","ORDER_EVA_NOT_EXIST"),
    ORDER_SERVICE_EVA_EXIST(200,"您已经评价过该订单","ORDER_SERVICE_EVA_EXIST");
    int status;

    String message;

    String code;

    private OrderServeError(int status,String message,String code){
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
