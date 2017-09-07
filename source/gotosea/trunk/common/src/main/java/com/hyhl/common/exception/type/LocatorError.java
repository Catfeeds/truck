package com.hyhl.common.exception.type;

import com.hyhl.common.exception.IBaseBusinessError;

import java.util.Locale;

public enum  LocatorError implements IBaseBusinessError {

    RESOURCE_NOTFOUND(200, "找不到对应的资源", "RESOURCE_NOTFOUND")

    ;
    int status;
    String message;
    String code;

    private LocatorError(int status,String message,String code){
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
