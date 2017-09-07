package com.hyhl.common.exception.type;

import com.hyhl.common.exception.IBaseBusinessError;

import java.util.Locale;

public enum  ProdError implements IBaseBusinessError {

    SERVICE_NOTFOUNT(200,"服务没有找到","SERVICE_NOTFOUNT"),
    DETAIL_SALES_PLAN_NOTFOUND(200,"没有对应的服务明细定价","DETAIL_SALES_PLAN_NOTFOUNT"),
    SERVICE_DETAIL_NOTFOUND(200,"服务明细项没有找到","SERVICE_DETAIL_NOTFOUND");
    ;

    private int status;
    private String message;
    private String code;

    private ProdError(int status,String message,String code){
        this.status = status;
        this.message = message;
        this.code = code;
    }

    @Override
    public int getStatus() {
        return status;
    }

    @Override
    public String getMessage() {
        return this.message;
    }

    @Override
    public String getCode() {
        return String.valueOf(status);
    }

    @Override
    public String getMessage(Locale locale) {
        return message;
    }
}
